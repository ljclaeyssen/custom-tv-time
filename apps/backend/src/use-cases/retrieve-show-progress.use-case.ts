import { Injectable } from '@nestjs/common';
import { ShowProgress } from '../domain/models/progress.model';
import { CatalogPort } from '../domain/ports/catalog.port';
import { FollowsPort } from '../domain/ports/follows.port';
import { WatchedEpisodesPort } from '../domain/ports/watched-episodes.port';

@Injectable()
export class RetrieveShowProgressUseCase {
  constructor(
    private readonly follows: FollowsPort,
    private readonly watchedEpisodes: WatchedEpisodesPort,
    private readonly catalog: CatalogPort,
  ) {}

  async execute(userId: string, tmdbShowId: number): Promise<ShowProgress> {
    const [detail, follow, watched] = await Promise.all([
      this.catalog.getShowDetail(tmdbShowId),
      this.follows.findOne(userId, tmdbShowId),
      this.watchedEpisodes.findByUserAndShow(userId, tmdbShowId),
    ]);

    const watchedBySeason = new Map<number, number>();
    for (const episode of watched) {
      watchedBySeason.set(episode.season, (watchedBySeason.get(episode.season) ?? 0) + 1);
    }

    return {
      detail,
      followed: follow !== null,
      status: follow?.status ?? null,
      watchedCount: watched.length,
      seasons: detail.seasons
        .filter((s) => s.seasonNumber > 0)
        .map((s) => ({
          seasonNumber: s.seasonNumber,
          name: s.name,
          episodeCount: s.episodeCount,
          watchedCount: watchedBySeason.get(s.seasonNumber) ?? 0,
          posterPath: s.posterPath,
          airDate: s.airDate,
        })),
    };
  }
}
