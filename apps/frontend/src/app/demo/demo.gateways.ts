import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatalogGateway } from '../domain/gateways/catalog.gateway';
import { MoviesGateway } from '../domain/gateways/movies.gateway';
import { ProfileGateway } from '../domain/gateways/profile.gateway';
import { ShowsGateway } from '../domain/gateways/shows.gateway';
import { StatsGateway } from '../domain/gateways/stats.gateway';
import { TimelinesGateway } from '../domain/gateways/timelines.gateway';
import { TokenStorageGateway } from '../domain/gateways/token-storage.gateway';
import { CatalogSearchResult } from '../domain/models/catalog.model';
import { TrackedMovie } from '../domain/models/movie.model';
import { TimelineDetail, TimelineSummary } from '../domain/models/timeline.model';
import {
  CatalogEpisode,
  EpisodeWithState,
  FollowedShow,
  FollowStatus,
  MyShowItem,
  RecentlyWatchedItem,
  ShowProgress,
  WatchNextItem,
} from '../domain/models/show.model';
import { ProfileStatsFull } from '../domain/models/stats.model';
import { Profile } from '../domain/models/user.model';
import {
  DEMO_EPISODES,
  DEMO_MOVIES,
  DEMO_PROFILE,
  DEMO_RECENTLY_WATCHED,
  DEMO_SEARCH,
  DEMO_SHOWS,
  DEMO_STATS,
  DEMO_TIMELINES,
  DEMO_WATCH_NEXT,
  DemoShowSeed,
} from './demo-data';

/** Petite latence simulée : les squelettes de chargement restent visibles. */
const LATENCY_MS = 250;

const respond = <T>(value: () => T): Observable<T> =>
  new Observable<T>((subscriber) => {
    const timer = setTimeout(() => {
      try {
        subscriber.next(value());
        subscriber.complete();
      } catch (error) {
        subscriber.error(error);
      }
    }, LATENCY_MS);
    return () => clearTimeout(timer);
  });

const daysAgoIso = (days: number): string => new Date(Date.now() - days * 86400000).toISOString();

interface DemoShowState extends DemoShowSeed {
  followed: boolean;
}

/**
 * État partagé de la démo : tout vit en mémoire, les interactions (cocher,
 * suivre, statut…) mutent cet état pour que la démo réagisse comme la vraie app.
 */
@Injectable()
export class DemoShowsGateway extends ShowsGateway {
  readonly #shows = new Map<number, DemoShowState>(
    DEMO_SHOWS.map((seed) => [seed.show.tmdbShowId, { ...seed, followed: true }]),
  );

  #watchNext: WatchNextItem[] = DEMO_WATCH_NEXT.map((wn) => {
    const state = this.#shows.get(wn.seed)!;
    return {
      show: state.show,
      nextEpisode: wn.nextEpisode,
      watchedCount: state.watchedCount,
      totalEpisodes: state.detail.numberOfEpisodes,
      lastWatchedAt: daysAgoIso(wn.lastWatchedDaysAgo),
    };
  });

  #recent: RecentlyWatchedItem[] = DEMO_RECENTLY_WATCHED.map((r) => ({
    tmdbShowId: r.tmdbShowId,
    showName: r.showName,
    posterPath: r.posterPath,
    season: r.season,
    episode: r.episode,
    watchedAt: daysAgoIso(r.daysAgo),
  }));

  /** Surcharges de l'état « vu » posées par les interactions (clé saison:épisode). */
  readonly #overrides = new Map<string, boolean>();

  override getWatchNext(): Observable<WatchNextItem[]> {
    return respond(() => [...this.#watchNext]);
  }

  override getRecentlyWatched(): Observable<RecentlyWatchedItem[]> {
    return respond(() => [...this.#recent]);
  }

  override getMyShows(): Observable<MyShowItem[]> {
    return respond(() =>
      [...this.#shows.values()]
        .filter((s) => s.followed)
        .map((s) => ({
          show: s.show,
          watchedCount: s.watchedCount,
          totalEpisodes: s.detail.numberOfEpisodes,
          ended: !s.detail.inProduction,
        })),
    );
  }

  override getShowProgress(tmdbShowId: number): Observable<ShowProgress> {
    return respond(() => {
      const s = this.#shows.get(tmdbShowId);
      if (!s) {
        throw new Error(`Série inconnue de la démo : ${tmdbShowId}`);
      }
      return {
        detail: s.detail,
        followed: s.followed,
        status: s.followed ? s.show.status : null,
        watchedCount: s.watchedCount,
        seasons: s.detail.seasons.map((season) => ({
          seasonNumber: season.seasonNumber,
          name: season.name,
          episodeCount: season.episodeCount,
          watchedCount: this.#watchedInSeason(s, season.seasonNumber),
          posterPath: season.posterPath,
          airDate: season.airDate,
        })),
      };
    });
  }

  override getSeasonEpisodes(tmdbShowId: number, seasonNumber: number): Observable<EpisodeWithState[]> {
    return respond(() => {
      const s = this.#shows.get(tmdbShowId);
      if (!s) {
        return [];
      }
      const watched = this.#watchedInSeason(s, seasonNumber);
      return this.#episodesOf(s, seasonNumber).map((e, index) => {
        const override = this.#overrides.get(this.#key(tmdbShowId, e.seasonNumber, e.episodeNumber));
        const isWatched = override ?? index < watched;
        return { ...e, watched: isWatched, watchedAt: isWatched ? daysAgoIso(30 + watched - index) : null };
      });
    });
  }

  override follow(tmdbShowId: number): Observable<FollowedShow> {
    return respond(() => {
      const s = this.#shows.get(tmdbShowId)!;
      s.followed = true;
      s.show = { ...s.show, status: 'watching' };
      return s.show;
    });
  }

  override unfollow(tmdbShowId: number): Observable<void> {
    return respond(() => {
      const s = this.#shows.get(tmdbShowId);
      if (s) {
        s.followed = false;
      }
    });
  }

  override updateStatus(tmdbShowId: number, status: FollowStatus): Observable<void> {
    return respond(() => {
      const s = this.#shows.get(tmdbShowId);
      if (s) {
        s.show = { ...s.show, status };
      }
    });
  }

  override markEpisodeWatched(tmdbShowId: number, season: number, episode: number): Observable<void> {
    return respond(() => {
      this.#overrides.set(this.#key(tmdbShowId, season, episode), true);
      const s = this.#shows.get(tmdbShowId);
      if (!s) {
        return;
      }
      s.watchedCount = Math.min(s.watchedCount + 1, s.detail.numberOfEpisodes);
      this.#recent = [
        {
          tmdbShowId,
          showName: s.show.name,
          posterPath: s.show.posterPath,
          season,
          episode,
          watchedAt: new Date().toISOString(),
        },
        ...this.#recent,
      ].slice(0, 12);
      this.#advanceWatchNext(s, season, episode);
    });
  }

  override unmarkEpisodeWatched(tmdbShowId: number, season: number, episode: number): Observable<void> {
    return respond(() => {
      this.#overrides.set(this.#key(tmdbShowId, season, episode), false);
      const s = this.#shows.get(tmdbShowId);
      if (s) {
        s.watchedCount = Math.max(0, s.watchedCount - 1);
      }
    });
  }

  override markSeasonWatched(tmdbShowId: number, seasonNumber: number): Observable<{ marked: number }> {
    return respond(() => {
      const s = this.#shows.get(tmdbShowId);
      if (!s) {
        return { marked: 0 };
      }
      const season = s.detail.seasons.find((se) => se.seasonNumber === seasonNumber);
      const already = this.#watchedInSeason(s, seasonNumber);
      const marked = Math.max(0, (season?.episodeCount ?? 0) - already);
      for (const e of this.#episodesOf(s, seasonNumber)) {
        this.#overrides.set(this.#key(tmdbShowId, e.seasonNumber, e.episodeNumber), true);
      }
      s.watchedCount = Math.min(s.watchedCount + marked, s.detail.numberOfEpisodes);
      return { marked };
    });
  }

  #key(show: number, season: number, episode: number): string {
    return `${show}:${season}:${episode}`;
  }

  /** Épisodes réels si la saison a été résolue via TMDB, synthétiques sinon. */
  #episodesOf(s: DemoShowState, seasonNumber: number): CatalogEpisode[] {
    const real = DEMO_EPISODES[`${s.show.tmdbShowId}:${seasonNumber}`];
    if (real) {
      return real;
    }
    const season = s.detail.seasons.find((se) => se.seasonNumber === seasonNumber);
    const start = season?.airDate ? new Date(season.airDate).getTime() : Date.now() - 400 * 86400000;
    return Array.from({ length: season?.episodeCount ?? 0 }, (_, i) => ({
      seasonNumber,
      episodeNumber: i + 1,
      name: `Épisode ${i + 1}`,
      overview: '',
      airDate: new Date(start + i * 7 * 86400000).toISOString().slice(0, 10),
      stillPath: null,
      runtime: s.detail.episodeRuntime,
    }));
  }

  /** Répartit le compteur global d'épisodes vus sur les saisons, dans l'ordre. */
  #watchedInSeason(s: DemoShowState, seasonNumber: number): number {
    let remaining = s.watchedCount;
    for (const season of s.detail.seasons) {
      const inThis = Math.min(remaining, season.episodeCount);
      if (season.seasonNumber === seasonNumber) {
        return inThis;
      }
      remaining -= inThis;
    }
    return 0;
  }

  /** Fait avancer (ou disparaître) la ligne « À voir » de la série cochée. */
  #advanceWatchNext(s: DemoShowState, season: number, episode: number): void {
    const item = this.#watchNext.find((w) => w.show.tmdbShowId === s.show.tmdbShowId);
    if (!item || item.nextEpisode.seasonNumber !== season || item.nextEpisode.episodeNumber !== episode) {
      return;
    }
    const episodes = this.#episodesOf(s, season);
    const next = episodes.find((e) => e.episodeNumber > episode);
    if (next) {
      item.nextEpisode = next;
      item.watchedCount = s.watchedCount;
      item.lastWatchedAt = new Date().toISOString();
    } else {
      this.#watchNext = this.#watchNext.filter((w) => w !== item);
    }
  }
}

@Injectable()
export class DemoMoviesGateway extends MoviesGateway {
  #movies: TrackedMovie[] = DEMO_MOVIES.map((m) => ({ ...m }));

  override getMyMovies(): Observable<TrackedMovie[]> {
    return respond(() => [...this.#movies]);
  }

  override track(tmdbMovieId: number, watched: boolean): Observable<TrackedMovie> {
    return respond(() => {
      const existing = this.#movies.find((m) => m.tmdbMovieId === tmdbMovieId);
      if (existing) {
        return existing;
      }
      const fromSearch = DEMO_SEARCH.find((r) => r.type === 'movie' && r.tmdbId === tmdbMovieId);
      const movie: TrackedMovie = {
        id: `demo-movie-${this.#movies.length + 1}`,
        userId: 'demo-user',
        tmdbMovieId,
        imdbId: null,
        title: fromSearch?.name ?? 'Film',
        posterPath: fromSearch?.posterPath ?? null,
        releaseDate: fromSearch?.year ? `${fromSearch.year}-01-01` : null,
        watchedAt: watched ? new Date().toISOString() : null,
        addedAt: new Date().toISOString(),
      };
      this.#movies = [movie, ...this.#movies];
      return movie;
    });
  }

  override setWatched(tmdbMovieId: number, watched: boolean): Observable<void> {
    return respond(() => {
      this.#movies = this.#movies.map((m) =>
        m.tmdbMovieId === tmdbMovieId ? { ...m, watchedAt: watched ? new Date().toISOString() : null } : m,
      );
    });
  }

  override untrack(tmdbMovieId: number): Observable<void> {
    return respond(() => {
      this.#movies = this.#movies.filter((m) => m.tmdbMovieId !== tmdbMovieId);
    });
  }
}

@Injectable()
export class DemoCatalogGateway extends CatalogGateway {
  override search(query: string): Observable<CatalogSearchResult[]> {
    return respond(() => {
      const q = query.trim().toLowerCase();
      return DEMO_SEARCH.filter((r) => r.name.toLowerCase().includes(q));
    });
  }
}

@Injectable()
export class DemoProfileGateway extends ProfileGateway {
  override getProfile(): Observable<Profile> {
    return respond(() => DEMO_PROFILE);
  }
}

@Injectable()
export class DemoStatsGateway extends StatsGateway {
  override getStats(): Observable<ProfileStatsFull> {
    return respond(() => DEMO_STATS);
  }
}

/** Session toujours ouverte : la démo ne demande jamais de connexion. */
@Injectable()
export class DemoTokenStorageGateway extends TokenStorageGateway {
  read(): string {
    return 'demo-session';
  }

  save(): void {
    // no-op : rien à persister en démo
  }

  clear(): void {
    // no-op : la déconnexion ne verrouille pas la démo (recharger suffit à revenir)
  }
}

// Durées moyennes de la démo (pas de runtimes TMDB en statique).
const DEMO_MOVIE_MINUTES = 120;
const DEMO_EPISODE_MINUTES = 40;

const demoRemainingMinutes = (items: TimelineDetail['items']): number =>
  items.reduce((minutes, item) => {
    if (item.progress.completed || item.progress.upcoming) {
      return minutes;
    }
    return item.itemType === 'movie'
      ? minutes + DEMO_MOVIE_MINUTES
      : minutes +
          (item.progress.airedEpisodes - item.progress.watchedEpisodes) * DEMO_EPISODE_MINUTES;
  }, 0);

@Injectable()
export class DemoTimelinesGateway extends TimelinesGateway {
  // Copie profonde du seed : « marquer vu » mute cet état sans toucher aux données.
  readonly #timelines = DEMO_TIMELINES.map((seed) => ({
    posterPath: seed.posterPath,
    detail: {
      ...seed.detail,
      items: seed.detail.items.map((item) => ({ ...item, progress: { ...item.progress } })),
    },
  }));

  getTimelines(): Observable<TimelineSummary[]> {
    return respond(() =>
      this.#timelines.map(({ posterPath, detail }) => ({
        id: detail.id,
        slug: detail.slug,
        name: detail.name,
        description: detail.description,
        posterPath,
        itemCount: detail.items.length,
        completedCount: detail.items.filter((i) => i.progress.completed).length,
      })),
    );
  }

  getTimelineDetail(slug: string): Observable<TimelineDetail> {
    return respond(() => {
      const found = this.#timelines.find((t) => t.detail.slug === slug);
      if (!found) {
        throw new Error(`Frise inconnue : ${slug}`);
      }
      return {
        ...found.detail,
        remainingMinutes: demoRemainingMinutes(found.detail.items),
        items: found.detail.items.map((item) => ({ ...item, progress: { ...item.progress } })),
      };
    });
  }

  watchItem(slug: string, itemId: string): Observable<void> {
    return respond(() => {
      const item = this.#timelines
        .find((t) => t.detail.slug === slug)
        ?.detail.items.find((i) => i.id === itemId);
      if (item && !item.progress.upcoming) {
        item.progress = {
          ...item.progress,
          watchedEpisodes: item.progress.airedEpisodes,
          completed: true,
        };
      }
      return undefined;
    });
  }
}
