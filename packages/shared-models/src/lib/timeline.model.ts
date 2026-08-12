export type TimelineItemType = 'movie' | 'season';

/**
 * Progression d'un item de frise, dérivée du tracking existant.
 * Film : 0/1 (sorti) ou 0/0 (pas encore sorti).
 * Saison : épisodes vus / épisodes diffusés.
 */
export interface TimelineItemProgress {
  watchedEpisodes: number;
  airedEpisodes: number;
  completed: boolean;
  upcoming: boolean;
}

export interface TimelineItem {
  id: string;
  position: number;
  /** Étiquette de regroupement (« Phase 1 »…) ; le front groupe les items consécutifs de même label. */
  section: string;
  itemType: TimelineItemType;
  /** tmdbMovieId si movie, tmdbShowId si season. */
  tmdbId: number;
  seasonNumber: number | null;
  title: string;
  posterPath: string | null;
  releaseDate: string | null;
  progress: TimelineItemProgress;
  /** Temps restant estimé sur cet item, en minutes (0 si complété ou « à venir »). */
  remainingMinutes: number;
  /**
   * Temps déjà passé estimé sur cet item, en minutes : épisodes vus × durée
   * moyenne, ou runtime du film s'il est vu (0 sur un item « à venir »).
   */
  watchedMinutes: number;
}

export interface TimelineSummary {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  posterPath: string | null;
  itemCount: number;
  completedCount: number;
}

export interface TimelineDetail {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  /**
   * Temps restant estimé pour finir la frise, en minutes : somme des
   * `remainingMinutes` des items (films sortis non vus + épisodes diffusés non
   * vus × durée moyenne — runtimes TMDB, défauts quand la durée est inconnue).
   */
  remainingMinutes: number;
  /**
   * Temps déjà passé estimé sur la frise, en minutes : somme des
   * `watchedMinutes` des items (films vus + épisodes vus × durée moyenne).
   */
  watchedMinutes: number;
  items: TimelineItem[];
}
