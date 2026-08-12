import { Injectable } from '@nestjs/common';
import { TimelineSummary } from '../domain/models/timeline.model';
import { todayIso } from '../domain/models/watched-episode.model';
import { CatalogPort } from '../domain/ports/catalog.port';
import { TimelinesPort } from '../domain/ports/timelines.port';
import { TrackedMoviesPort } from '../domain/ports/tracked-movies.port';
import { WatchedEpisodesPort } from '../domain/ports/watched-episodes.port';
import { buildUserWatchMaps, computeItemProgress, loadAiredCounts } from './helpers/timeline-progress';

@Injectable()
export class RetrieveTimelinesUseCase {
  constructor(
    private readonly timelines: TimelinesPort,
    private readonly trackedMovies: TrackedMoviesPort,
    private readonly watchedEpisodes: WatchedEpisodesPort,
    private readonly catalog: CatalogPort,
  ) {}

  async execute(userId: string): Promise<TimelineSummary[]> {
    const [timelines, allItems, movies, episodes] = await Promise.all([
      this.timelines.findAll(),
      this.timelines.findAllItems(),
      this.trackedMovies.findAllByUser(userId),
      this.watchedEpisodes.findAllByUser(userId),
    ]);
    if (timelines.length === 0) {
      return [];
    }

    const today = todayIso();
    const maps = buildUserWatchMaps(movies, episodes);
    const airedCounts = await loadAiredCounts(
      this.catalog,
      allItems
        .filter((item) => item.itemType === 'season' && item.seasonNumber !== null)
        .map((item) => ({ tmdbShowId: item.tmdbId, seasonNumber: item.seasonNumber as number })),
      today,
    );

    return timelines.map((timeline) => {
      const items = allItems.filter((item) => item.timelineId === timeline.id);
      const completedCount = items.filter(
        (item) => computeItemProgress(item, maps, airedCounts, today).completed,
      ).length;
      return {
        id: timeline.id,
        slug: timeline.slug,
        name: timeline.name,
        description: timeline.description,
        posterPath: timeline.posterPath,
        itemCount: items.length,
        completedCount,
      };
    });
  }
}
