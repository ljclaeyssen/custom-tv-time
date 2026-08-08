import { MovieMeta, ShowMeta } from '../models/meta.model';

/** Cache persistant des métadonnées TMDB (genres, runtimes) utilisées par les stats. */
export abstract class StatsMetaPort {
  abstract getShowMeta(tmdbShowIds: number[]): Promise<Map<number, ShowMeta>>;
  abstract saveShowMeta(meta: ShowMeta[]): Promise<void>;
  abstract getMovieMeta(tmdbMovieIds: number[]): Promise<Map<number, MovieMeta>>;
  abstract saveMovieMeta(meta: MovieMeta[]): Promise<void>;
}
