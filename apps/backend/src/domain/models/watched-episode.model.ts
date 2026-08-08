export type WatchSource = 'import' | 'manual';

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
