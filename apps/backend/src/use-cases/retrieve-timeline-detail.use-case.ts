import { Injectable } from '@nestjs/common';
import { EntityNotFoundError } from '../domain/exceptions/domain.errors';
import { TimelineDetail } from '../domain/models/timeline.model';
import { todayIso } from '../domain/models/watched-episode.model';
import { CatalogPort } from '../domain/ports/catalog.port';
import { TimelinesPort } from '../domain/ports/timelines.port';
import { TrackedMoviesPort } from '../domain/ports/tracked-movies.port';
import { WatchedEpisodesPort } from '../domain/ports/watched-episodes.port';
import { buildUserWatchMaps, computeItemProgress, loadAiredCounts } from './helpers/timeline-progress';

@Injectable()
export class RetrieveTimelineDetailUseCase {
  constructor(
    private readonly timelines: TimelinesPort,
    private readonly trackedMovies: TrackedMoviesPort,
    private readonly watchedEpisodes: WatchedEpisodesPort,
    private readonly catalog: CatalogPort,
  ) {}

  async execute(userId: string, slug: string): Promise<TimelineDetail> {
    const timeline = await this.timelines.findBySlug(slug);
    if (!timeline) {
      throw new EntityNotFoundError('Frise', slug);
    }

    const [items, movies, episodes] = await Promise.all([
      this.timelines.findItems(timeline.id),
      this.trackedMovies.findAllByUser(userId),
      this.watchedEpisodes.findAllByUser(userId),
    ]);

    const today = todayIso();
    const maps = buildUserWatchMaps(movies, episodes);
    const airedCounts = await loadAiredCounts(this.catalog, items, today);

    return {
      id: timeline.id,
      slug: timeline.slug,
      name: timeline.name,
      description: timeline.description,
      items: items.map((item) => ({
        id: item.id,
        position: item.position,
        section: item.section,
        itemType: item.itemType,
        tmdbId: item.tmdbId,
        seasonNumber: item.seasonNumber,
        title: item.title,
        posterPath: item.posterPath,
        releaseDate: item.releaseDate,
        progress: computeItemProgress(item, maps, airedCounts, today),
      })),
    };
  }
}
