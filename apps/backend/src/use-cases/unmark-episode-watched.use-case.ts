import { Injectable } from '@nestjs/common';
import { WatchedEpisodesPort } from '../domain/ports/watched-episodes.port';

@Injectable()
export class UnmarkEpisodeWatchedUseCase {
  constructor(private readonly watchedEpisodes: WatchedEpisodesPort) {}

  async execute(userId: string, tmdbShowId: number, season: number, episode: number): Promise<void> {
    await this.watchedEpisodes.remove(userId, tmdbShowId, season, episode);
  }
}
