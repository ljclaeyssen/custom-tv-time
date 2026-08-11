import { TimelineItemProgress, TimelineItemRecord } from '../../domain/models/timeline.model';
import { TrackedMovie } from '../../domain/models/tracked-movie.model';
import {
  WatchedEpisode,
  episodeKey,
  isAired,
  seasonKeyPrefix,
} from '../../domain/models/watched-episode.model';
import { CatalogPort } from '../../domain/ports/catalog.port';
import { mapWithConcurrency } from './concurrency';

/** Clé « showId:saison » de la map des comptes d'épisodes diffusés. */
export function seasonAiredKey(tmdbShowId: number, seasonNumber: number): string {
  return `${tmdbShowId}:${seasonNumber}`;
}

export interface UserWatchMaps {
  watchedMovieIds: Set<number>;
  watchedKeysByShow: Map<number, Set<string>>;
}

export function buildUserWatchMaps(
  movies: TrackedMovie[],
  episodes: WatchedEpisode[],
): UserWatchMaps {
  const watchedMovieIds = new Set<number>();
  for (const movie of movies) {
    if (movie.watchedAt !== null) {
      watchedMovieIds.add(movie.tmdbMovieId);
    }
  }
  const watchedKeysByShow = new Map<number, Set<string>>();
  for (const episode of episodes) {
    let set = watchedKeysByShow.get(episode.tmdbShowId);
    if (!set) {
      set = new Set();
      watchedKeysByShow.set(episode.tmdbShowId, set);
    }
    set.add(episodeKey(episode.season, episode.episode));
  }
  return { watchedMovieIds, watchedKeysByShow };
}

/**
 * Charge le nombre d'épisodes DIFFUSÉS de chaque saison référencée par les items.
 * Une saison TMDB en échec est absente de la map : l'item sera « à venir »
 * plutôt que de casser tout l'écran (même stratégie que watch-next).
 */
export async function loadAiredCounts(
  catalog: CatalogPort,
  items: TimelineItemRecord[],
  today: string,
): Promise<Map<string, number>> {
  const keys = [
    ...new Set(
      items
        .filter((i) => i.itemType === 'season' && i.seasonNumber !== null)
        .map((i) => seasonAiredKey(i.tmdbId, i.seasonNumber as number)),
    ),
  ];
  const counts = new Map<string, number>();
  await mapWithConcurrency(keys, 8, async (key) => {
    const [tmdbShowId, seasonNumber] = key.split(':').map(Number);
    try {
      const episodes = await catalog.getSeasonEpisodes(tmdbShowId, seasonNumber);
      counts.set(key, episodes.filter((e) => isAired(e.airDate, today)).length);
    } catch {
      // Saison irrésolue : traitée comme « à venir », l'écran reste intact.
    }
  });
  return counts;
}

/**
 * Film : 0/1 selon le tracking et la date de sortie. Saison : épisodes vus /
 * diffusés, avec clamp min(vus, diffusés) pour absorber les divergences de
 * numérotation TVDB/TMDB héritées de l'import (cas des animes).
 */
export function computeItemProgress(
  item: TimelineItemRecord,
  maps: UserWatchMaps,
  airedCounts: Map<string, number>,
  today: string,
): TimelineItemProgress {
  if (item.itemType === 'movie') {
    const aired = isAired(item.releaseDate, today) ? 1 : 0;
    const watched = maps.watchedMovieIds.has(item.tmdbId) ? 1 : 0;
    return toProgress(Math.min(watched, aired), aired);
  }
  if (item.seasonNumber === null) {
    return toProgress(0, 0);
  }
  const aired = airedCounts.get(seasonAiredKey(item.tmdbId, item.seasonNumber)) ?? 0;
  const keys = maps.watchedKeysByShow.get(item.tmdbId);
  const prefix = seasonKeyPrefix(item.seasonNumber);
  const watched = keys ? [...keys].filter((k) => k.startsWith(prefix)).length : 0;
  return toProgress(Math.min(watched, aired), aired);
}

function toProgress(watchedEpisodes: number, airedEpisodes: number): TimelineItemProgress {
  return {
    watchedEpisodes,
    airedEpisodes,
    completed: airedEpisodes > 0 && watchedEpisodes >= airedEpisodes,
    upcoming: airedEpisodes === 0,
  };
}
