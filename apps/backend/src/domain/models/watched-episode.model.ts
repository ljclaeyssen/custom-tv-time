export type WatchSource = 'import' | 'manual';

// Règle métier partagée front/back, consommée ici via le barrel domain.
export { isAired, todayIso } from '@ctt/shared-models';

/** Clé composite « saison:épisode », partagée entre use-cases et lecture des sets d'épisodes vus. */
export function episodeKey(season: number, episode: number): string {
  return `${season}:${episode}`;
}

/** Préfixe de clé pour filtrer les épisodes vus d'une saison. */
export function seasonKeyPrefix(season: number): string {
  return `${season}:`;
}

export interface WatchedEpisode {
  id: string;
  userId: string;
  tmdbShowId: number;
  season: number;
  episode: number;
  watchedAt: string | null;
  source: WatchSource;
}

export type WatchedEpisodeInput = Omit<WatchedEpisode, 'id'>;
