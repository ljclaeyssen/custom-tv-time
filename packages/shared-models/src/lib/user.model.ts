export interface User {
  id: string;
  discordId: string;
  username: string;
  avatarUrl: string | null;
  createdAt: string;
}

export interface ProfileStats {
  showsFollowed: number;
  episodesWatched: number;
  moviesWatched: number;
  moviesInWatchlist: number;
}

export interface Profile {
  user: User;
  stats: ProfileStats;
}

export interface ImportReport {
  seriesImported: number;
  seriesSkipped: number;
  moviesImported: number;
  moviesSkipped: number;
  episodesImported: number;
  warnings: string[];
}
