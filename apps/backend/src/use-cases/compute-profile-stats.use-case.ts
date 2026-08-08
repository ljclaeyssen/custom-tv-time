import { Injectable } from '@nestjs/common';
import { MovieMeta, ShowMeta } from '../domain/models/meta.model';
import { ProfileStatsFull } from '../domain/models/stats.model';
import { CatalogPort } from '../domain/ports/catalog.port';
import { FollowsPort } from '../domain/ports/follows.port';
import { StatsMetaPort } from '../domain/ports/stats-meta.port';
import { TrackedMoviesPort } from '../domain/ports/tracked-movies.port';
import { WatchedEpisodesPort } from '../domain/ports/watched-episodes.port';
import { mapWithConcurrency } from './helpers/concurrency';

const DEFAULT_EPISODE_RUNTIME = 40;
const DEFAULT_MOVIE_RUNTIME = 100;

// Dédoublonne les calculs concurrents (double-tap, deux onglets, retry) : le
// premier remplissage de cache TMDB est coûteux, inutile de le lancer deux fois.
const inflight = new Map<string, Promise<ProfileStatsFull>>();

@Injectable()
export class ComputeProfileStatsUseCase {
  constructor(
    private readonly watchedEpisodes: WatchedEpisodesPort,
    private readonly follows: FollowsPort,
    private readonly trackedMovies: TrackedMoviesPort,
    private readonly catalog: CatalogPort,
    private readonly meta: StatsMetaPort,
  ) {}

  execute(userId: string): Promise<ProfileStatsFull> {
    const running = inflight.get(userId);
    if (running) {
      return running;
    }
    const promise = this.#compute(userId).finally(() => inflight.delete(userId));
    inflight.set(userId, promise);
    return promise;
  }

  async #compute(userId: string): Promise<ProfileStatsFull> {
    const [episodes, followedShows, movies] = await Promise.all([
      this.watchedEpisodes.findAllByUser(userId),
      this.follows.findAllByUser(userId),
      this.trackedMovies.findAllByUser(userId),
    ]);

    const showName = new Map(followedShows.map((f) => [f.tmdbShowId, f.name]));
    const showIds = [...new Set(episodes.map((e) => e.tmdbShowId))];
    const watchedMovies = movies.filter((m) => m.watchedAt !== null);
    const movieIds = watchedMovies.map((m) => m.tmdbMovieId);

    // Les deux remplissages de cache en parallèle (divise le temps à froid par ~2).
    const [[showMeta, estimatedShows], [movieMeta, estimatedMovies]] = await Promise.all([
      this.#ensureShowMeta(showIds),
      this.#ensureMovieMeta(movieIds),
    ]);
    let estimated = estimatedShows || estimatedMovies;

    // --- Temps d'écran + genres (pondérés par temps) ---
    let seriesMinutes = 0;
    const genreMinutes = new Map<string, number>();
    for (const ep of episodes) {
      const m = showMeta.get(ep.tmdbShowId);
      const runtime = m?.episodeRuntime ?? DEFAULT_EPISODE_RUNTIME;
      if (m?.episodeRuntime == null) estimated = true;
      seriesMinutes += runtime;
      for (const genre of m?.genres ?? []) {
        genreMinutes.set(genre, (genreMinutes.get(genre) ?? 0) + runtime);
      }
    }
    let moviesMinutes = 0;
    for (const mv of watchedMovies) {
      const runtime = movieMeta.get(mv.tmdbMovieId)?.runtime;
      if (runtime == null) estimated = true;
      moviesMinutes += runtime ?? DEFAULT_MOVIE_RUNTIME;
    }
    const totalMinutes = seriesMinutes + moviesMinutes;

    const genres = [...genreMinutes.entries()]
      .map(([genre, minutes]) => ({
        genre,
        minutes,
        pct: seriesMinutes > 0 ? Math.round((minutes / seriesMinutes) * 1000) / 10 : 0,
      }))
      .sort((a, b) => b.minutes - a.minutes);

    // --- Agrégats temporels (mois / an / records) sur les épisodes datés ---
    const dated = episodes.filter((e) => e.watchedAt !== null);
    const monthMap = new Map<string, { year: number; month: number; episodes: number; minutes: number; showCounts: Map<number, number> }>();
    const yearMap = new Map<number, { episodes: number; minutes: number }>();
    const dayCount = new Map<string, number>();

    for (const ep of dated) {
      const d = new Date(ep.watchedAt as string);
      const year = d.getUTCFullYear();
      const month = d.getUTCMonth() + 1;
      const runtime = showMeta.get(ep.tmdbShowId)?.episodeRuntime ?? DEFAULT_EPISODE_RUNTIME;
      const dayKey = d.toISOString().slice(0, 10);
      dayCount.set(dayKey, (dayCount.get(dayKey) ?? 0) + 1);

      const mKey = `${year}-${month}`;
      let cell = monthMap.get(mKey);
      if (!cell) {
        cell = { year, month, episodes: 0, minutes: 0, showCounts: new Map() };
        monthMap.set(mKey, cell);
      }
      cell.episodes += 1;
      cell.minutes += runtime;
      cell.showCounts.set(ep.tmdbShowId, (cell.showCounts.get(ep.tmdbShowId) ?? 0) + 1);

      const y = yearMap.get(year) ?? { episodes: 0, minutes: 0 };
      y.episodes += 1;
      y.minutes += runtime;
      yearMap.set(year, y);
    }

    // Matrice mensuelle dense du premier mois vu → mois courant
    const monthly = this.#buildDenseMonthly(monthMap, showName);
    const nonEmptyCounts = monthly.filter((c) => c.episodes > 0).map((c) => c.episodes);
    const quantileThresholds = this.#quantiles(nonEmptyCounts, [0.2, 0.4, 0.6, 0.8]);

    const annual = [...yearMap.entries()]
      .map(([year, v]) => ({ year, episodes: v.episodes, minutes: v.minutes }))
      .sort((a, b) => a.year - b.year);

    const records = {
      mostActiveYear: annual.length ? annual.reduce((a, b) => (b.episodes > a.episodes ? b : a)).year : null,
      biggestMonth: monthly.length
        ? (() => {
            const top = monthly.reduce((a, b) => (b.episodes > a.episodes ? b : a));
            return top.episodes > 0 ? { year: top.year, month: top.month, episodes: top.episodes } : null;
          })()
        : null,
      longestStreakDays: this.#longestStreak([...dayCount.keys()]),
      biggestBingeDay: this.#biggestDay(dayCount),
    };

    // --- Équivalences parlantes ---
    const totalHours = Math.round(totalMinutes / 60);
    const equivalences = [
      { label: 'heures de visionnage', value: totalHours.toLocaleString('fr-FR') },
      { label: 'films de 2h', value: `≈ ${Math.round(totalMinutes / 120).toLocaleString('fr-FR')}` },
      { label: 'marathons de 8h', value: `≈ ${Math.round(totalHours / 8).toLocaleString('fr-FR')}` },
    ];

    return {
      screenTime: { totalMinutes, seriesMinutes, moviesMinutes, equivalences, estimated },
      genres,
      monthly,
      quantileThresholds,
      annual,
      records,
      generatedAt: new Date().toISOString(),
    };
  }

  async #ensureShowMeta(showIds: number[]): Promise<[Map<number, ShowMeta>, boolean]> {
    const cached = await this.meta.getShowMeta(showIds);
    const missing = showIds.filter((id) => !cached.has(id));
    let estimated = false;
    if (missing.length > 0) {
      const results = await mapWithConcurrency(missing, 8, async (id): Promise<{ meta: ShowMeta; ok: boolean }> => {
        try {
          const detail = await this.catalog.getShowDetail(id);
          return { meta: { tmdbShowId: id, genres: detail.genres, episodeRuntime: detail.episodeRuntime }, ok: true };
        } catch {
          estimated = true;
          return { meta: { tmdbShowId: id, genres: [], episodeRuntime: null }, ok: false };
        }
      });
      // On ne persiste QUE les fetches réussis : un échec transitoire ne doit pas
      // figer la série sur ses valeurs par défaut (pas de negative caching).
      await this.meta.saveShowMeta(results.filter((r) => r.ok).map((r) => r.meta));
      for (const r of results) cached.set(r.meta.tmdbShowId, r.meta);
    }
    return [cached, estimated];
  }

  async #ensureMovieMeta(movieIds: number[]): Promise<[Map<number, MovieMeta>, boolean]> {
    const cached = await this.meta.getMovieMeta(movieIds);
    const missing = movieIds.filter((id) => !cached.has(id));
    let estimated = false;
    if (missing.length > 0) {
      const results = await mapWithConcurrency(missing, 8, async (id): Promise<{ meta: MovieMeta; ok: boolean }> => {
        try {
          const detail = await this.catalog.getMovieDetail(id);
          return { meta: { tmdbMovieId: id, runtime: detail.runtime }, ok: true };
        } catch {
          estimated = true;
          return { meta: { tmdbMovieId: id, runtime: null }, ok: false };
        }
      });
      await this.meta.saveMovieMeta(results.filter((r) => r.ok).map((r) => r.meta));
      for (const r of results) cached.set(r.meta.tmdbMovieId, r.meta);
    }
    return [cached, estimated];
  }

  #buildDenseMonthly(
    monthMap: Map<string, { year: number; month: number; episodes: number; minutes: number; showCounts: Map<number, number> }>,
    showName: Map<number, string>,
  ): ProfileStatsFull['monthly'] {
    if (monthMap.size === 0) {
      return [];
    }
    const cells = [...monthMap.values()];
    const first = cells.reduce((a, b) => (a.year * 12 + a.month <= b.year * 12 + b.month ? a : b));
    const now = new Date();
    const startIdx = first.year * 12 + (first.month - 1);
    const endIdx = now.getUTCFullYear() * 12 + now.getUTCMonth();
    const out: ProfileStatsFull['monthly'] = [];
    for (let idx = startIdx; idx <= endIdx; idx++) {
      const year = Math.floor(idx / 12);
      const month = (idx % 12) + 1;
      const cell = monthMap.get(`${year}-${month}`);
      let topShow: string | null = null;
      if (cell && cell.showCounts.size > 0) {
        const topId = [...cell.showCounts.entries()].reduce((a, b) => (b[1] > a[1] ? b : a))[0];
        topShow = showName.get(topId) ?? `#${topId}`;
      }
      out.push({ year, month, episodes: cell?.episodes ?? 0, minutes: cell?.minutes ?? 0, topShow });
    }
    return out;
  }

  #quantiles(values: number[], qs: number[]): number[] {
    if (values.length === 0) {
      return qs.map(() => 0);
    }
    const sorted = [...values].sort((a, b) => a - b);
    return qs.map((q) => {
      const pos = (sorted.length - 1) * q;
      const lo = Math.floor(pos);
      const hi = Math.ceil(pos);
      return Math.round(sorted[lo] + (sorted[hi] - sorted[lo]) * (pos - lo));
    });
  }

  #longestStreak(dayKeys: string[]): number {
    if (dayKeys.length === 0) {
      return 0;
    }
    const days = [...new Set(dayKeys)].sort();
    let best = 1;
    let cur = 1;
    for (let i = 1; i < days.length; i++) {
      const prev = Date.parse(days[i - 1] + 'T00:00:00Z');
      const curr = Date.parse(days[i] + 'T00:00:00Z');
      if (curr - prev === 86400000) {
        cur += 1;
        best = Math.max(best, cur);
      } else {
        cur = 1;
      }
    }
    return best;
  }

  #biggestDay(dayCount: Map<string, number>): { date: string; episodes: number } | null {
    if (dayCount.size === 0) {
      return null;
    }
    const [date, episodes] = [...dayCount.entries()].reduce((a, b) => (b[1] > a[1] ? b : a));
    return { date, episodes };
  }
}
