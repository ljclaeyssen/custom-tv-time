import { MovieMeta, ShowMeta } from '../../domain/models/meta.model';
import {
  TimelineItem,
  TimelineItemProgress,
  TimelineItemRecord,
} from '../../domain/models/timeline.model';
import { TrackedMovie } from '../../domain/models/tracked-movie.model';
import {
  WatchedEpisode,
  episodeKey,
  isAired,
  seasonKeyPrefix,
} from '../../domain/models/watched-episode.model';
import { CatalogPort } from '../../domain/ports/catalog.port';
import { mapWithConcurrency } from './concurrency';
import { DEFAULT_EPISODE_RUNTIME, DEFAULT_MOVIE_RUNTIME } from './meta';

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

/**
 * Temps restant pour finir la frise : films sortis non vus + épisodes diffusés
 * non vus × durée moyenne. Les items « à venir » ne comptent pas (rien à
 * regarder aujourd'hui).
 */
export function computeRemainingMinutes(
  items: TimelineItem[],
  showMeta: Map<number, ShowMeta>,
  movieMeta: Map<number, MovieMeta>,
): number {
  let minutes = 0;
  for (const item of items) {
    if (item.progress.completed || item.progress.upcoming) {
      continue;
    }
    if (item.itemType === 'movie') {
      minutes += movieMeta.get(item.tmdbId)?.runtime ?? DEFAULT_MOVIE_RUNTIME;
    } else {
      const perEpisode = showMeta.get(item.tmdbId)?.episodeRuntime ?? DEFAULT_EPISODE_RUNTIME;
      minutes += (item.progress.airedEpisodes - item.progress.watchedEpisodes) * perEpisode;
    }
  }
  return minutes;
}

function toProgress(watchedEpisodes: number, airedEpisodes: number): TimelineItemProgress {
  return {
    watchedEpisodes,
    airedEpisodes,
    completed: airedEpisodes > 0 && watchedEpisodes >= airedEpisodes,
    upcoming: airedEpisodes === 0,
  };
}
