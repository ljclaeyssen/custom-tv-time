import { Injectable } from '@nestjs/common';
import { EntityNotFoundError } from '../domain/exceptions/domain.errors';
import { TimelineDetail, TimelineItem } from '../domain/models/timeline.model';
import { todayIso } from '../domain/models/watched-episode.model';
import { CatalogPort } from '../domain/ports/catalog.port';
import { StatsMetaPort } from '../domain/ports/stats-meta.port';
import { TimelinesPort } from '../domain/ports/timelines.port';
import { TrackedMoviesPort } from '../domain/ports/tracked-movies.port';
import { WatchedEpisodesPort } from '../domain/ports/watched-episodes.port';
import { ensureMovieMeta, ensureShowMeta } from './helpers/meta';
import {
  buildUserWatchMaps,
  computeItemProgress,
  itemRemainingMinutes,
  loadAiredCounts,
} from './helpers/timeline-progress';

@Injectable()
export class RetrieveTimelineDetailUseCase {
  constructor(
    private readonly timelines: TimelinesPort,
    private readonly trackedMovies: TrackedMoviesPort,
    private readonly watchedEpisodes: WatchedEpisodesPort,
    private readonly catalog: CatalogPort,
    private readonly meta: StatsMetaPort,
  ) {}

  async execute(userId: string, slug: string): Promise<TimelineDetail> {
    const timeline = await this.timelines.findBySlug(slug);
    if (!timeline) {
      throw new EntityNotFoundError('Frise', slug);
    }

    const [records, movies, episodes] = await Promise.all([
      this.timelines.findItems(timeline.id),
      this.trackedMovies.findAllByUser(userId),
      this.watchedEpisodes.findAllByUser(userId),
    ]);

    const today = todayIso();
    const maps = buildUserWatchMaps(movies, episodes);
    const airedCounts = await loadAiredCounts(this.catalog, records, today);

    const progressed = records.map((record) => ({
      record,
      progress: computeItemProgress(record, maps, airedCounts, today),
    }));

    // Runtimes uniquement pour ce qui reste à voir (cache show_meta/movie_meta,
    // même canal que les stats — les manquants sont résolus via TMDB puis persistés).
    const remaining = progressed.filter((p) => !p.progress.completed && !p.progress.upcoming);
    const [[showMeta], [movieMeta]] = await Promise.all([
      ensureShowMeta(this.meta, this.catalog, [
        ...new Set(remaining.filter((p) => p.record.itemType === 'season').map((p) => p.record.tmdbId)),
      ]),
      ensureMovieMeta(this.meta, this.catalog, [
        ...new Set(remaining.filter((p) => p.record.itemType === 'movie').map((p) => p.record.tmdbId)),
      ]),
    ]);

    const items: TimelineItem[] = progressed.map(({ record, progress }) => ({
      id: record.id,
      position: record.position,
      section: record.section,
      itemType: record.itemType,
      tmdbId: record.tmdbId,
      seasonNumber: record.seasonNumber,
      title: record.title,
      posterPath: record.posterPath,
      releaseDate: record.releaseDate,
      progress,
      remainingMinutes: itemRemainingMinutes(
        { itemType: record.itemType, tmdbId: record.tmdbId, progress },
        showMeta,
        movieMeta,
      ),
    }));

    return {
      id: timeline.id,
      slug: timeline.slug,
      name: timeline.name,
      description: timeline.description,
      remainingMinutes: items.reduce((sum, item) => sum + item.remainingMinutes, 0),
      items,
    };
  }
}
