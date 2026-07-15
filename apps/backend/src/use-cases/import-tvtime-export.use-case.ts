import { Injectable } from '@nestjs/common';
import { FollowStatus } from '../domain/models/followed-show.model';
import { ImportReport, TvtimeSeries, TvtimeWatchedEpisode } from '../domain/models/tvtime-export.model';
import { WatchedEpisodeInput } from '../domain/models/watched-episode.model';
import { CatalogPort } from '../domain/ports/catalog.port';
import { FollowsPort } from '../domain/ports/follows.port';
import { TrackedMoviesPort } from '../domain/ports/tracked-movies.port';
import { TvtimeExportPort } from '../domain/ports/tvtime-export.port';
import { WatchedEpisodesPort } from '../domain/ports/watched-episodes.port';
import { mapWithConcurrency } from './helpers/concurrency';

@Injectable()
export class ImportTvtimeExportUseCase {
  constructor(
    private readonly exportSource: TvtimeExportPort,
    private readonly catalog: CatalogPort,
    private readonly follows: FollowsPort,
    private readonly watchedEpisodes: WatchedEpisodesPort,
    private readonly trackedMovies: TrackedMoviesPort,
  ) {}

  async execute(userId: string): Promise<ImportReport> {
    const data = await this.exportSource.load();

    // Fusion des flags "vu" par épisode : TV Time n'émet pas de watch event pour
    // les épisodes cochés en masse — seuls les flags par épisode font foi.
    const seenFlags = await this.exportSource.loadSeenFlags();
    let mergedFromFlags = 0;
    if (seenFlags) {
      const knownEpisodeIds = new Set(data.watched_episodes.map((e) => e.episode_id));
      for (const show of seenFlags.shows) {
        for (const flag of show.watched) {
          if (!knownEpisodeIds.has(flag.id)) {
            mergedFromFlags++;
            data.watched_episodes.push({
              show_id: show.tvdb_id,
              show_name: '',
              season: flag.s,
              episode: flag.e,
              episode_id: flag.id,
              title: '',
              seen_date: null,
              times_watched: 1,
            });
          }
        }
      }
    }

    const report: ImportReport = {
      seriesImported: 0,
      seriesSkipped: 0,
      moviesImported: 0,
      moviesSkipped: 0,
      episodesImported: 0,
      warnings: [],
    };

    // 1. Résolution TVDB -> TMDB et création des follows
    const tvdbToTmdb = new Map<number, number>();
    await mapWithConcurrency(data.series, 5, async (series) => {
      try {
        const resolved = await this.catalog.findShowByTvdbId(series.tvdb_id);
        if (!resolved) {
          report.seriesSkipped++;
          report.warnings.push(`Série non résolue sur TMDB : "${series.name}" (tvdb ${series.tvdb_id})`);
          return;
        }
        tvdbToTmdb.set(series.tvdb_id, resolved.tmdbId);
        const existing = await this.follows.findOne(userId, resolved.tmdbId);
        if (existing) {
          report.seriesSkipped++;
          return;
        }
        await this.follows.add({
          userId,
          tmdbShowId: resolved.tmdbId,
          tvdbId: series.tvdb_id,
          name: resolved.name,
          posterPath: resolved.posterPath,
          status: this.mapStatus(series),
          followedAt: series.followed_at,
        });
        report.seriesImported++;
      } catch (error) {
        report.seriesSkipped++;
        report.warnings.push(`Erreur sur la série "${series.name}" : ${(error as Error).message}`);
      }
    });

    // 2. Épisodes vus — resynchronisation complète des coches issues de l'import.
    // Chaque épisode est résolu individuellement via son ID TVDB (/find) ; ceux
    // que TMDB ne connaît pas sont replacés par position absolue dans la série
    // (indispensable pour les animes dont le découpage en saisons diffère).
    // Les coches manuelles faites dans l'app ne sont jamais touchées.
    const resolvableEpisodes = data.watched_episodes.filter((e) => tvdbToTmdb.has(e.show_id));
    const skippedForUnresolvedShow = data.watched_episodes.length - resolvableEpisodes.length;

    const resolutions = new Map<number, { season: number; episode: number } | null>();
    await mapWithConcurrency(resolvableEpisodes, 12, async (episode) => {
      try {
        const resolved = await this.catalog.findEpisodeByTvdbId(episode.episode_id);
        resolutions.set(episode.episode_id, resolved ? { season: resolved.season, episode: resolved.episode } : null);
      } catch {
        resolutions.set(episode.episode_id, null);
      }
    });

    const byShow = new Map<number, TvtimeWatchedEpisode[]>();
    for (const episode of resolvableEpisodes) {
      const list = byShow.get(episode.show_id) ?? [];
      list.push(episode);
      byShow.set(episode.show_id, list);
    }

    let repositioned = 0;
    let unplaceable = 0;
    const rows: WatchedEpisodeInput[] = [];
    await mapWithConcurrency([...byShow.entries()], 4, async ([tvdbShowId, showEpisodes]) => {
      const tmdbShowId = tvdbToTmdb.get(tvdbShowId) as number;
      const needsFallback = showEpisodes.some((e) => !resolutions.get(e.episode_id));

      // Liste TMDB en ordre absolu, seulement si un repli positionnel est nécessaire.
      let absolute: { season: number; episode: number }[] | null = null;
      if (needsFallback) {
        try {
          const detail = await this.catalog.getShowDetail(tmdbShowId);
          absolute = [];
          const seasons = detail.seasons
            .filter((s) => s.seasonNumber > 0)
            .sort((a, b) => a.seasonNumber - b.seasonNumber);
          for (const season of seasons) {
            const seasonEpisodes = await this.catalog.getSeasonEpisodes(tmdbShowId, season.seasonNumber);
            absolute.push(...seasonEpisodes.map((e) => ({ season: e.seasonNumber, episode: e.episodeNumber })));
          }
        } catch {
          absolute = null;
        }
      }

      // Tailles des saisons TVDB estimées depuis l'export (max d'épisode vu par saison).
      const seasonSizes = new Map<number, number>();
      for (const e of showEpisodes) {
        if (e.season > 0) {
          seasonSizes.set(e.season, Math.max(seasonSizes.get(e.season) ?? 0, e.episode));
        }
      }
      const offsets = new Map<number, number>();
      let acc = 0;
      for (const s of [...seasonSizes.keys()].sort((a, b) => a - b)) {
        offsets.set(s, acc);
        acc += seasonSizes.get(s) ?? 0;
      }

      for (const episode of showEpisodes) {
        const watchedAt = episode.seen_date
          ? new Date(episode.seen_date.replace(' ', 'T') + 'Z').toISOString()
          : null;
        const resolved = resolutions.get(episode.episode_id);
        if (resolved) {
          rows.push({ userId, tmdbShowId, season: resolved.season, episode: resolved.episode, watchedAt, source: 'import' });
          continue;
        }
        // Repli positionnel — les épisodes spéciaux (saison 0) ne sont pas replaçables.
        const candidate =
          episode.season > 0 && absolute
            ? absolute[(offsets.get(episode.season) ?? 0) + episode.episode - 1]
            : undefined;
        if (candidate) {
          repositioned++;
          rows.push({ userId, tmdbShowId, season: candidate.season, episode: candidate.episode, watchedAt, source: 'import' });
        } else {
          unplaceable++;
        }
      }
    });

    await this.watchedEpisodes.removeImportedForShows(userId, [...new Set(tvdbToTmdb.values())]);
    report.episodesImported = await this.watchedEpisodes.addMany(rows);
    if (mergedFromFlags > 0) {
      report.warnings.push(
        `${mergedFromFlags} épisodes ajoutés depuis les flags "vu" TV Time (cochage en masse sans watch event)`,
      );
    }
    if (skippedForUnresolvedShow > 0) {
      report.warnings.push(`${skippedForUnresolvedShow} épisodes ignorés (série non résolue sur TMDB)`);
    }
    if (repositioned > 0) {
      report.warnings.push(
        `${repositioned} épisodes replacés par position absolue (numérotation TVDB ≠ TMDB)`,
      );
    }
    if (unplaceable > 0) {
      report.warnings.push(`${unplaceable} épisodes impossibles à placer sur TMDB (spéciaux ou hors catalogue)`);
    }

    // 3. Films
    await mapWithConcurrency(data.movies, 5, async (movie) => {
      try {
        if (!movie.imdb_id) {
          report.moviesSkipped++;
          report.warnings.push(`Film sans imdb_id : "${movie.name}"`);
          return;
        }
        const resolved = await this.catalog.findMovieByImdbId(movie.imdb_id);
        if (!resolved) {
          report.moviesSkipped++;
          report.warnings.push(`Film non résolu sur TMDB : "${movie.name}" (${movie.imdb_id})`);
          return;
        }
        await this.trackedMovies.upsert({
          userId,
          tmdbMovieId: resolved.tmdbId,
          imdbId: movie.imdb_id,
          title: resolved.title,
          posterPath: resolved.posterPath,
          releaseDate: resolved.releaseDate,
          watchedAt: movie.watched_at,
        });
        report.moviesImported++;
      } catch (error) {
        report.moviesSkipped++;
        report.warnings.push(`Erreur sur le film "${movie.name}" : ${(error as Error).message}`);
      }
    });

    return report;
  }

  private mapStatus(series: TvtimeSeries): FollowStatus {
    if (series.filters.includes('stopped')) return 'stopped';
    if (series.filters.includes('watch_later')) return 'watch_later';
    if (series.filters.includes('not_started_yet')) return 'not_started';
    if (series.filters.includes('up_to_date')) return 'up_to_date';
    return 'watching';
  }
}
