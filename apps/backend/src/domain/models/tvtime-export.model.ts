// Format des fichiers d'export TV Time — volontairement partiel :
// seuls les champs consommés par l'import sont modélisés.

export interface TvtimeSeries {
  tvdb_id: number;
  name: string;
  followed_at: string;
  filters: string[];
}

export interface TvtimeMovie {
  name: string;
  imdb_id: string | null;
  watched_at: string | null;
}

export interface TvtimeWatchedEpisode {
  show_id: number;
  season: number;
  episode: number;
  episode_id: number;
  seen_date: string | null;
}

export interface TvtimeExport {
  series: TvtimeSeries[];
  movies: TvtimeMovie[];
  watched_episodes: TvtimeWatchedEpisode[];
}

export interface TvtimeSeenFlagShow {
  tvdb_id: number;
  watched: { id: number; s: number; e: number }[];
}

export interface TvtimeSeenFlags {
  shows: TvtimeSeenFlagShow[];
}

export type { ImportReport } from '@ctt/shared-models';
