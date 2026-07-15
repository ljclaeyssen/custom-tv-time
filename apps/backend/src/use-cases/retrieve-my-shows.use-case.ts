import { Injectable } from '@nestjs/common';
import { MyShowItem } from '../domain/models/progress.model';
import { CatalogPort } from '../domain/ports/catalog.port';
import { FollowsPort } from '../domain/ports/follows.port';
import { WatchedEpisodesPort } from '../domain/ports/watched-episodes.port';
import { mapWithConcurrency } from './helpers/concurrency';

@Injectable()
export class RetrieveMyShowsUseCase {
  constructor(
    private readonly follows: FollowsPort,
    private readonly watchedEpisodes: WatchedEpisodesPort,
    private readonly catalog: CatalogPort,
  ) {}

  async execute(userId: string): Promise<MyShowItem[]> {
    const [followedShows, allWatched] = await Promise.all([
      this.follows.findAllByUser(userId),
      this.watchedEpisodes.findAllByUser(userId),
    ]);

    const watchedCountByShow = new Map<number, number>();
    for (const episode of allWatched) {
      watchedCountByShow.set(
        episode.tmdbShowId,
        (watchedCountByShow.get(episode.tmdbShowId) ?? 0) + 1,
      );
    }

    return mapWithConcurrency(followedShows, 8, async (show) => {
      let totalEpisodes = 0;
      let ended = false;
      try {
        const detail = await this.catalog.getShowDetail(show.tmdbShowId);
        totalEpisodes = detail.numberOfEpisodes;
        ended = !detail.inProduction;
      } catch {
        // Métadonnées indisponibles : on garde la ligne avec ce qu'on sait.
      }
      return {
        show,
        watchedCount: watchedCountByShow.get(show.tmdbShowId) ?? 0,
        totalEpisodes,
        ended,
      } satisfies MyShowItem;
    });
  }
}
