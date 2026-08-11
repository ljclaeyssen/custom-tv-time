import { MovieMeta, ShowMeta } from '../../domain/models/meta.model';
import { CatalogPort } from '../../domain/ports/catalog.port';
import { StatsMetaPort } from '../../domain/ports/stats-meta.port';
import { mapWithConcurrency } from './concurrency';

export const DEFAULT_EPISODE_RUNTIME = 40;
export const DEFAULT_MOVIE_RUNTIME = 100;

export function ensureShowMeta(
  meta: StatsMetaPort,
  catalog: CatalogPort,
  showIds: number[],
): Promise<[Map<number, ShowMeta>, boolean]> {
  return ensureMeta(showIds, {
    getCached: (ids) => meta.getShowMeta(ids),
    fetchOne: async (id) => {
      const detail = await catalog.getShowDetail(id);
      return { tmdbShowId: id, genres: detail.genres, episodeRuntime: detail.episodeRuntime };
    },
    fallback: (id) => ({ tmdbShowId: id, genres: [], episodeRuntime: null }),
    save: (metas) => meta.saveShowMeta(metas),
    keyOf: (m) => m.tmdbShowId,
  });
}

export function ensureMovieMeta(
  meta: StatsMetaPort,
  catalog: CatalogPort,
  movieIds: number[],
): Promise<[Map<number, MovieMeta>, boolean]> {
  return ensureMeta(movieIds, {
    getCached: (ids) => meta.getMovieMeta(ids),
    fetchOne: async (id) => {
      const detail = await catalog.getMovieDetail(id);
      return { tmdbMovieId: id, runtime: detail.runtime };
    },
    fallback: (id) => ({ tmdbMovieId: id, runtime: null }),
    save: (metas) => meta.saveMovieMeta(metas),
    keyOf: (m) => m.tmdbMovieId,
  });
}

/** Lit le cache de métadonnées TMDB, complète les manquants, et signale si des valeurs sont estimées. */
async function ensureMeta<T>(
  ids: number[],
  ops: {
    getCached: (ids: number[]) => Promise<Map<number, T>>;
    fetchOne: (id: number) => Promise<T>;
    fallback: (id: number) => T;
    save: (metas: T[]) => Promise<unknown>;
    keyOf: (meta: T) => number;
  },
): Promise<[Map<number, T>, boolean]> {
  const cached = await ops.getCached(ids);
  const missing = ids.filter((id) => !cached.has(id));
  let estimated = false;
  if (missing.length > 0) {
    const results = await mapWithConcurrency(missing, 8, async (id): Promise<{ meta: T; ok: boolean }> => {
      try {
        return { meta: await ops.fetchOne(id), ok: true };
      } catch {
        estimated = true;
        return { meta: ops.fallback(id), ok: false };
      }
    });
    // On ne persiste QUE les fetches réussis : un échec transitoire ne doit pas
    // figer l'entrée sur ses valeurs par défaut (pas de negative caching).
    await ops.save(results.filter((r) => r.ok).map((r) => r.meta));
    for (const r of results) cached.set(ops.keyOf(r.meta), r.meta);
  }
  return [cached, estimated];
}
