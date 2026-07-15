export interface TvtimeSeries {
  tvdb_id: number;
  name: string;
  is_ended: boolean;
  followed_at: string;
  filters: string[];
  last_watched_at: string | null;
}

export interface TvtimeMovie {
  uuid: string;
  name: string;
  imdb_id: string | null;
  release_date: string | null;
  followed_at: string;
  watched_at: string | null;
  rewatch_count: number;
  filters: string[];
}

export interface TvtimeWatchedEpisode {
  show_id: number;
  show_name: string;
  season: number;
  episode: number;
  episode_id: number;
  title: string;
  seen_date: string | null;
  times_watched: number;
}

export interface TvtimeExport {
  exported_at: string;
  user: { id: number; username: string };
  series: TvtimeSeries[];
  movies: TvtimeMovie[];
  watched_episodes: TvtimeWatchedEpisode[];
}

export interface TvtimeSeenFlagShow {
  tvdb_id: number;
  total_episodes: number;
  watched: { id: number; s: number; e: number }[];
}

export interface TvtimeSeenFlags {
  extracted_at: string;
  user_id: number;
  shows: TvtimeSeenFlagShow[];
}

export type { ImportReport } from '@ctt/shared-models';
