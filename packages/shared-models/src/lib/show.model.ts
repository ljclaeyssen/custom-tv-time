export const FollowStatus = {
  Watching: 'watching',
  UpToDate: 'up_to_date',
  NotStarted: 'not_started',
  Stopped: 'stopped',
  WatchLater: 'watch_later',
} as const;
export type FollowStatus = (typeof FollowStatus)[keyof typeof FollowStatus];

export interface FollowedShow {
  id: string;
  userId: string;
  tmdbShowId: number;
  tvdbId: number | null;
  name: string;
  posterPath: string | null;
  status: FollowStatus;
  followedAt: string;
}

export interface CatalogSeasonSummary {
  seasonNumber: number;
  name: string;
  episodeCount: number;
  posterPath: string | null;
  airDate: string | null;
}

export interface CatalogShowDetail {
  tmdbId: number;
  name: string;
  overview: string;
  posterPath: string | null;
  backdropPath: string | null;
  firstAirDate: string | null;
  status: string;
  inProduction: boolean;
  numberOfEpisodes: number;
  numberOfSeasons: number;
  /** Durée moyenne d'un épisode en minutes (TMDB episode_run_time), null si inconnue. */
  episodeRuntime: number | null;
  genres: string[];
  seasons: CatalogSeasonSummary[];
}

export interface CatalogEpisode {
  seasonNumber: number;
  episodeNumber: number;
  name: string;
  overview: string;
  airDate: string | null;
  stillPath: string | null;
  runtime: number | null;
}

export interface EpisodeWithState extends CatalogEpisode {
  watched: boolean;
  watchedAt: string | null;
}

export interface WatchNextItem {
  show: FollowedShow;
  nextEpisode: CatalogEpisode;
  watchedCount: number;
  totalEpisodes: number;
  lastWatchedAt: string | null;
}

export interface MyShowItem {
  show: FollowedShow;
  watchedCount: number;
  totalEpisodes: number;
  ended: boolean;
}

export interface SeasonProgress {
  seasonNumber: number;
  name: string;
  episodeCount: number;
  watchedCount: number;
  posterPath: string | null;
  airDate: string | null;
}

export interface ShowProgress {
  detail: CatalogShowDetail;
  followed: boolean;
  status: FollowStatus | null;
  watchedCount: number;
  seasons: SeasonProgress[];
}
