export const WatchSource = {
  Import: 'import',
  Manual: 'manual',
} as const;
export type WatchSource = (typeof WatchSource)[keyof typeof WatchSource];

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
