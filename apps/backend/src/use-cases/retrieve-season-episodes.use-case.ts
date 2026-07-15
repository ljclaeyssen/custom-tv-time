import { Injectable } from '@nestjs/common';
import { EpisodeWithState } from '../domain/models/progress.model';
import { CatalogPort } from '../domain/ports/catalog.port';
import { WatchedEpisodesPort } from '../domain/ports/watched-episodes.port';

@Injectable()
export class RetrieveSeasonEpisodesUseCase {
  constructor(
    private readonly catalog: CatalogPort,
    private readonly watchedEpisodes: WatchedEpisodesPort,
  ) {}

  async execute(userId: string, tmdbShowId: number, seasonNumber: number): Promise<EpisodeWithState[]> {
    const [episodes, watched] = await Promise.all([
      this.catalog.getSeasonEpisodes(tmdbShowId, seasonNumber),
      this.watchedEpisodes.findByUserAndShow(userId, tmdbShowId),
    ]);

    const watchedMap = new Map<string, string | null>();
    for (const episode of watched) {
      watchedMap.set(`${episode.season}:${episode.episode}`, episode.watchedAt);
    }

    return episodes.map((e) => {
      const key = `${e.seasonNumber}:${e.episodeNumber}`;
      return {
        ...e,
        watched: watchedMap.has(key),
        watchedAt: watchedMap.get(key) ?? null,
      };
    });
  }
}
