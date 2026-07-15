import { Injectable } from '@nestjs/common';
import { ProfileStats } from '../domain/models/progress.model';
import { FollowsPort } from '../domain/ports/follows.port';
import { TrackedMoviesPort } from '../domain/ports/tracked-movies.port';
import { WatchedEpisodesPort } from '../domain/ports/watched-episodes.port';

@Injectable()
export class RetrieveProfileStatsUseCase {
  constructor(
    private readonly follows: FollowsPort,
    private readonly watchedEpisodes: WatchedEpisodesPort,
    private readonly trackedMovies: TrackedMoviesPort,
  ) {}

  async execute(userId: string): Promise<ProfileStats> {
    const [followedShows, episodesWatched, movies] = await Promise.all([
      this.follows.findAllByUser(userId),
      this.watchedEpisodes.countByUser(userId),
      this.trackedMovies.findAllByUser(userId),
    ]);
    return {
      showsFollowed: followedShows.length,
      episodesWatched,
      moviesWatched: movies.filter((m) => m.watchedAt !== null).length,
      moviesInWatchlist: movies.filter((m) => m.watchedAt === null).length,
    };
  }
}
