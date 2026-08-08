export interface StatsEquivalence {
  label: string;
  value: string;
}

export interface ScreenTimeStats {
  totalMinutes: number;
  seriesMinutes: number;
  moviesMinutes: number;
  equivalences: StatsEquivalence[];
  /** true si au moins un runtime a été estimé par défaut (données TMDB manquantes). */
  estimated: boolean;
}

export interface GenreStat {
  genre: string;
  minutes: number;
  /** Part du temps de séries (les genres se cumulent, un show est multi-genre). */
  pct: number;
}

export interface MonthCell {
  year: number;
  month: number; // 1-12
  episodes: number;
  minutes: number;
  topShow: string | null;
}

export interface AnnualPoint {
  year: number;
  episodes: number;
  minutes: number;
}

export interface StatsRecords {
  mostActiveYear: number | null;
  biggestMonth: { year: number; month: number; episodes: number } | null;
  longestStreakDays: number;
  biggestBingeDay: { date: string; episodes: number } | null;
}

export interface ProfileStatsFull {
  screenTime: ScreenTimeStats;
  genres: GenreStat[];
  monthly: MonthCell[];
  /** 4 seuils (quantiles) sur le nombre d'épisodes/mois → 5 paliers d'intensité. */
  quantileThresholds: number[];
  annual: AnnualPoint[];
  records: StatsRecords;
  generatedAt: string;
}
