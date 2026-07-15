import { TvtimeExport, TvtimeSeenFlags } from '../models/tvtime-export.model';

export abstract class TvtimeExportPort {
  abstract load(): Promise<TvtimeExport>;
  /** Flags "vu" par épisode extraits de TV Time (null si le fichier est absent). */
  abstract loadSeenFlags(): Promise<TvtimeSeenFlags | null>;
}
