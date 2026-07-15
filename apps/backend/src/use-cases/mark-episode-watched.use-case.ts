import { Injectable } from '@nestjs/common';
import { WatchedEpisodesPort } from '../domain/ports/watched-episodes.port';

@Injectable()
export class MarkEpisodeWatchedUseCase {
  constructor(private readonly watchedEpisodes: WatchedEpisodesPort) {}

  async execute(userId: string, tmdbShowId: number, season: number, episode: number): Promise<void> {
    await this.watchedEpisodes.addMany([
      { userId, tmdbShowId, season, episode, watchedAt: new Date().toISOString(), source: 'manual' },
    ]);
  }
}
