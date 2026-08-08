import { Injectable } from '@nestjs/common';
import { isAired, todayIso } from '@ctt/shared-models';
import { WatchNextItem } from '../domain/models/progress.model';
import { episodeKey, seasonKeyPrefix } from '../domain/models/watched-episode.model';
import { CatalogPort } from '../domain/ports/catalog.port';
import { FollowsPort } from '../domain/ports/follows.port';
import { WatchedEpisodesPort } from '../domain/ports/watched-episodes.port';
import { mapWithConcurrency } from './helpers/concurrency';

@Injectable()
export class RetrieveWatchNextUseCase {
  constructor(
    private readonly follows: FollowsPort,
    private readonly watchedEpisodes: WatchedEpisodesPort,
    private readonly catalog: CatalogPort,
  ) {}

  async execute(userId: string): Promise<WatchNextItem[]> {
    const [followedShows, allWatched] = await Promise.all([
      this.follows.findAllByUser(userId),
      this.watchedEpisodes.findAllByUser(userId),
    ]);

    const watchedByShow = new Map<number, Set<string>>();
    const lastWatchedByShow = new Map<number, string>();
    for (const episode of allWatched) {
      let set = watchedByShow.get(episode.tmdbShowId);
      if (!set) {
        set = new Set();
        watchedByShow.set(episode.tmdbShowId, set);
      }
      set.add(episodeKey(episode.season, episode.episode));
      if (episode.watchedAt) {
        const current = lastWatchedByShow.get(episode.tmdbShowId);
        if (!current || episode.watchedAt > current) {
          lastWatchedByShow.set(episode.tmdbShowId, episode.watchedAt);
        }
      }
    }

    const candidates = followedShows.filter((f) => f.status !== 'stopped');
    const today = todayIso();

    const items = await mapWithConcurrency(candidates, 8, async (show) => {
      try {
        const watched = watchedByShow.get(show.tmdbShowId) ?? new Set<string>();
        const detail = await this.catalog.getShowDetail(show.tmdbShowId);
        // Autant d'épisodes vus que d'épisodes existants : la série est à jour,
        // même si la numérotation TVDB (import) diverge de celle de TMDB
        // (cas classique des animes découpés différemment).
        if (detail.numberOfEpisodes > 0 && watched.size >= detail.numberOfEpisodes) {
          return null;
        }
        const seasons = detail.seasons
          .filter((s) => s.seasonNumber > 0)
          .sort((a, b) => a.seasonNumber - b.seasonNumber);

        for (const season of seasons) {
          const watchedInSeason = [...watched].filter(
            (key) => key.startsWith(seasonKeyPrefix(season.seasonNumber)),
          ).length;
          if (season.episodeCount > 0 && watchedInSeason >= season.episodeCount) {
            continue;
          }
          const episodes = await this.catalog.getSeasonEpisodes(show.tmdbShowId, season.seasonNumber);
          const next = episodes.find(
            (e) => !watched.has(episodeKey(e.seasonNumber, e.episodeNumber)) && isAired(e.airDate, today),
          );
          if (next) {
            return {
              show,
              nextEpisode: next,
              watchedCount: watched.size,
              totalEpisodes: detail.numberOfEpisodes,
              lastWatchedAt: lastWatchedByShow.get(show.tmdbShowId) ?? null,
            } satisfies WatchNextItem;
          }
          // Toute la partie diffusée de cette saison est vue : le reste n'a pas
          // encore été diffusé, inutile d'aller voir les saisons suivantes.
          if (episodes.some((e) => !isAired(e.airDate, today))) {
            return null;
          }
        }
        return null;
      } catch {
        // Une série non résolue ne doit pas casser tout l'écran "À voir".
        return null;
      }
    });

    // Tri : dernière activité, puis ajout le plus récent, puis alphabétique.
    // Les séries jamais commencées ferment donc la liste.
    return items
      .filter((item): item is WatchNextItem => item !== null)
      .sort((a, b) => {
        if (a.lastWatchedAt !== b.lastWatchedAt) {
          if (a.lastWatchedAt === null) return 1;
          if (b.lastWatchedAt === null) return -1;
          return b.lastWatchedAt.localeCompare(a.lastWatchedAt);
        }
        if (a.show.followedAt !== b.show.followedAt) {
          return b.show.followedAt.localeCompare(a.show.followedAt);
        }
        return a.show.name.localeCompare(b.show.name);
      });
  }
}
