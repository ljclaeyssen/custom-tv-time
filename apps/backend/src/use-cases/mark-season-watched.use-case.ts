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
    const aired = episodes
      .filter((e) => e.airDate !== null && e.airDate <= today)
      .sort((a, b) => a.episodeNumber - b.episodeNumber);
    // 1 ms d'écart croissant par épisode : ils se trient dans l'ordre de la saison
    // (E01 le plus ancien → dernier épisode le plus récent) dans "Vu récemment".
    const base = Date.now();
    return this.watchedEpisodes.addMany(
      aired.map((e, i) => ({
        userId,
        tmdbShowId,
        season: e.seasonNumber,
        episode: e.episodeNumber,
        watchedAt: new Date(base + i).toISOString(),
        source: 'manual' as const,
      })),
    );
  }
}
