import { Injectable } from '@nestjs/common';
import { RecentlyWatchedItem } from '../domain/models/progress.model';
import { FollowsPort } from '../domain/ports/follows.port';
import { WatchedEpisodesPort } from '../domain/ports/watched-episodes.port';

@Injectable()
export class RetrieveRecentlyWatchedUseCase {
  constructor(
    private readonly watchedEpisodes: WatchedEpisodesPort,
    private readonly follows: FollowsPort,
  ) {}

  async execute(userId: string, limit = 40): Promise<RecentlyWatchedItem[]> {
    const [episodes, followedShows] = await Promise.all([
      this.watchedEpisodes.findRecentByUser(userId, limit),
      this.follows.findAllByUser(userId),
    ]);
    const byId = new Map(followedShows.map((f) => [f.tmdbShowId, f]));
    return episodes.map((e) => {
      const show = byId.get(e.tmdbShowId);
      return {
        tmdbShowId: e.tmdbShowId,
        showName: show?.name ?? `#${e.tmdbShowId}`,
        posterPath: show?.posterPath ?? null,
        season: e.season,
        episode: e.episode,
        watchedAt: e.watchedAt,
      } satisfies RecentlyWatchedItem;
    });
  }
}
