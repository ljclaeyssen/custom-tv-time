import { Injectable } from '@nestjs/common';
import { CatalogPort } from '../domain/ports/catalog.port';
import { WatchedEpisodesPort } from '../domain/ports/watched-episodes.port';

@Injectable()
export class MarkSeasonWatchedUseCase {
  constructor(
    private readonly catalog: CatalogPort,
    private readonly watchedEpisodes: WatchedEpisodesPort,
  ) {}

  async execute(userId: string, tmdbShowId: number, seasonNumber: number): Promise<number> {
    const episodes = await this.catalog.getSeasonEpisodes(tmdbShowId, seasonNumber);
    const today = new Date().toISOString().slice(0, 10);
    const aired = episodes.filter((e) => e.airDate !== null && e.airDate <= today);
    const watchedAt = new Date().toISOString();
    return this.watchedEpisodes.addMany(
      aired.map((e) => ({
        userId,
        tmdbShowId,
        season: e.seasonNumber,
        episode: e.episodeNumber,
        watchedAt,
        source: 'manual' as const,
      })),
    );
  }
}
