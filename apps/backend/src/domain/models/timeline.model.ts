import { TimelineItemType } from '@ctt/shared-models';

// Types partagés front/back, consommés ici via le barrel domain.
export type {
  TimelineDetail,
  TimelineItem,
  TimelineItemProgress,
  TimelineItemType,
  TimelineSummary,
} from '@ctt/shared-models';

/** Une frise telle que persistée (métadonnées, sans ses items). */
export interface Timeline {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  posterPath: string | null;
  position: number;
}

/** Un item tel que persisté : la progression est calculée par les use-cases. */
export interface TimelineItemRecord {
  id: string;
  timelineId: string;
  position: number;
  section: string;
  itemType: TimelineItemType;
  tmdbId: number;
  seasonNumber: number | null;
  title: string;
  posterPath: string | null;
  releaseDate: string | null;
}

/** Un item de seed : le contenu versionné dans le repo, sans identité en base. */
export type TimelineSeedItem = Omit<TimelineItemRecord, 'id' | 'timelineId'>;

/**
 * Une frise telle que versionnée dans le repo (générée par
 * tools/generate-frise.mjs) — la base est synchronisée dessus au démarrage.
 */
export interface TimelineSeed {
  slug: string;
  name: string;
  description: string | null;
  posterPath: string | null;
  position: number;
  items: TimelineSeedItem[];
}

export interface TimelineSyncReport {
  created: number;
  updated: number;
  removed: number;
  unchanged: number;
}
