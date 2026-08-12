import { Injectable } from '@nestjs/common';
import { ShowProgress } from '../domain/models/progress.model';
import { todayIso } from '../domain/models/watched-episode.model';
import { CatalogPort } from '../domain/ports/catalog.port';
import { FollowsPort } from '../domain/ports/follows.port';
import { WatchedEpisodesPort } from '../domain/ports/watched-episodes.port';
import { DEFAULT_EPISODE_RUNTIME } from './helpers/meta';
import { loadAiredCounts, seasonAiredKey, watchTime } from './helpers/timeline-progress';

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

    const numbered = detail.seasons.filter((s) => s.seasonNumber > 0);
    const today = todayIso();
    // Épisodes diffusés saison par saison : même canal que l'écran saison, et le
    // cache TMDB (6 h) rend ces appels bon marché. Une saison irrésolue est
    // absente de la map : son restant tombe à 0, l'écran reste intact.
    const airedCounts = await loadAiredCounts(
      this.catalog,
      numbered.map((s) => ({ tmdbShowId, seasonNumber: s.seasonNumber })),
      today,
    );
    const perEpisode = detail.episodeRuntime ?? DEFAULT_EPISODE_RUNTIME;

    const seasons = numbered.map((s) => {
      // Compte brut des épisodes vus : cohérent avec l'affichage « X / Y ».
      const watchedCount = watchedBySeason.get(s.seasonNumber) ?? 0;
      const aired = airedCounts.get(seasonAiredKey(tmdbShowId, s.seasonNumber)) ?? 0;
      return {
        seasonNumber: s.seasonNumber,
        name: s.name,
        episodeCount: s.episodeCount,
        watchedCount,
        posterPath: s.posterPath,
        airDate: s.airDate,
        ...watchTime(watchedCount, aired, perEpisode),
      };
    });

    return {
      detail,
      followed: follow !== null,
      status: follow?.status ?? null,
      watchedCount: watched.length,
      watchedMinutes: seasons.reduce((sum, s) => sum + s.watchedMinutes, 0),
      remainingMinutes: seasons.reduce((sum, s) => sum + s.remainingMinutes, 0),
      seasons,
    };
  }
}
