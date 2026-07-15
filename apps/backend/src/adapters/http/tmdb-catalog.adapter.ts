import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  CatalogEpisode,
  CatalogMovieDetail,
  CatalogSearchResult,
  CatalogShowDetail,
} from '../../domain/models/catalog.model';
import { CatalogPort } from '../../domain/ports/catalog.port';
import { ExternalServiceError } from '../../domain/exceptions/domain.errors';

const BASE_URL = 'https://api.themoviedb.org/3';
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6h — les métadonnées TMDB bougent peu

interface CacheEntry {
  expiresAt: number;
  value: unknown;
}

@Injectable()
export class TmdbCatalogAdapter extends CatalogPort {
  readonly #token: string;
  readonly #cache = new Map<string, CacheEntry>();

  constructor(config: ConfigService) {
    super();
    this.#token = config.get<string>('TMDB_API_READ_ACCESS_TOKEN', '');
  }

  async search(query: string, type: 'show' | 'movie' | 'all'): Promise<CatalogSearchResult[]> {
    const results: CatalogSearchResult[] = [];
    if (type === 'show' || type === 'all') {
      const data = await this.#get<TmdbPaged<TmdbTvResult>>('/search/tv', { query });
      results.push(...data.results.map((r) => this.#toShowResult(r)));
    }
    if (type === 'movie' || type === 'all') {
      const data = await this.#get<TmdbPaged<TmdbMovieResult>>('/search/movie', { query });
      results.push(...data.results.map((r) => this.#toMovieResult(r)));
    }
    return results.sort((a, b) => (b.year ?? '').localeCompare(a.year ?? ''));
  }

  async getShowDetail(tmdbId: number): Promise<CatalogShowDetail> {
    const data = await this.#getCached<TmdbShowDetail>(`/tv/${tmdbId}`, {});
    return {
      tmdbId: data.id,
      name: data.name,
      overview: data.overview ?? '',
      posterPath: data.poster_path,
      backdropPath: data.backdrop_path,
      firstAirDate: data.first_air_date || null,
      status: data.status ?? '',
      inProduction: Boolean(data.in_production),
      numberOfEpisodes: data.number_of_episodes ?? 0,
      numberOfSeasons: data.number_of_seasons ?? 0,
      genres: (data.genres ?? []).map((g) => g.name),
      seasons: (data.seasons ?? []).map((s) => ({
        seasonNumber: s.season_number,
        name: s.name,
        episodeCount: s.episode_count,
        posterPath: s.poster_path,
        airDate: s.air_date,
      })),
    };
  }

  async getSeasonEpisodes(tmdbId: number, seasonNumber: number): Promise<CatalogEpisode[]> {
    const data = await this.#getCached<TmdbSeasonDetail>(`/tv/${tmdbId}/season/${seasonNumber}`, {});
    return (data.episodes ?? []).map((e) => ({
      seasonNumber: e.season_number,
      episodeNumber: e.episode_number,
      name: e.name,
      overview: e.overview ?? '',
      airDate: e.air_date,
      stillPath: e.still_path,
      runtime: e.runtime,
    }));
  }

  async getMovieDetail(tmdbId: number): Promise<CatalogMovieDetail> {
    const data = await this.#getCached<TmdbMovieDetail>(`/movie/${tmdbId}`, {});
    return {
      tmdbId: data.id,
      imdbId: data.imdb_id,
      title: data.title,
      overview: data.overview ?? '',
      posterPath: data.poster_path,
      backdropPath: data.backdrop_path,
      releaseDate: data.release_date || null,
      runtime: data.runtime,
      genres: (data.genres ?? []).map((g) => g.name),
    };
  }

  async findShowByTvdbId(tvdbId: number) {
    const data = await this.#get<TmdbFindResult>(`/find/${tvdbId}`, { external_source: 'tvdb_id' });
    const show = data.tv_results?.[0];
    return show ? { tmdbId: show.id, name: show.name, posterPath: show.poster_path } : null;
  }

  async findEpisodeByTvdbId(tvdbEpisodeId: number) {
    const data = await this.#get<TmdbFindResult>(`/find/${tvdbEpisodeId}`, {
      external_source: 'tvdb_id',
    });
    const episode = data.tv_episode_results?.[0];
    return episode
      ? {
          tmdbShowId: episode.show_id,
          season: episode.season_number,
          episode: episode.episode_number,
        }
      : null;
  }

  async findMovieByImdbId(imdbId: string) {
    const data = await this.#get<TmdbFindResult>(`/find/${imdbId}`, { external_source: 'imdb_id' });
    const movie = data.movie_results?.[0];
    return movie
      ? {
          tmdbId: movie.id,
          title: movie.title,
          posterPath: movie.poster_path,
          releaseDate: movie.release_date || null,
        }
      : null;
  }

  async #getCached<T>(path: string, params: Record<string, string>): Promise<T> {
    const key = path + JSON.stringify(params);
    const hit = this.#cache.get(key);
    if (hit && hit.expiresAt > Date.now()) {
      return hit.value as T;
    }
    const value = await this.#get<T>(path, params);
    this.#cache.set(key, { value, expiresAt: Date.now() + CACHE_TTL_MS });
    return value;
  }

  async #get<T>(path: string, params: Record<string, string>): Promise<T> {
    const url = new URL(BASE_URL + path);
    url.searchParams.set('language', 'fr-FR');
    for (const [k, v] of Object.entries(params)) {
      url.searchParams.set(k, v);
    }
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${this.#token}`, Accept: 'application/json' },
    });
    if (!response.ok) {
      throw new ExternalServiceError('TMDB', `${response.status} sur ${path}`);
    }
    return (await response.json()) as T;
  }

  #toShowResult(r: TmdbTvResult): CatalogSearchResult {
    return {
      tmdbId: r.id,
      type: 'show',
      name: r.name,
      posterPath: r.poster_path,
      year: r.first_air_date ? r.first_air_date.slice(0, 4) : null,
      overview: r.overview ?? '',
    };
  }

  #toMovieResult(r: TmdbMovieResult): CatalogSearchResult {
    return {
      tmdbId: r.id,
      type: 'movie',
      name: r.title,
      posterPath: r.poster_path,
      year: r.release_date ? r.release_date.slice(0, 4) : null,
      overview: r.overview ?? '',
    };
  }
}

interface TmdbPaged<T> {
  results: T[];
}
interface TmdbTvResult {
  id: number;
  name: string;
  poster_path: string | null;
  first_air_date?: string;
  overview?: string;
}
interface TmdbMovieResult {
  id: number;
  title: string;
  poster_path: string | null;
  release_date?: string;
  overview?: string;
}
interface TmdbShowDetail {
  id: number;
  name: string;
  overview?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date?: string;
  status?: string;
  in_production?: boolean;
  number_of_episodes?: number;
  number_of_seasons?: number;
  genres?: { name: string }[];
  seasons?: {
    season_number: number;
    name: string;
    episode_count: number;
    poster_path: string | null;
    air_date: string | null;
  }[];
}
interface TmdbSeasonDetail {
  episodes?: {
    season_number: number;
    episode_number: number;
    name: string;
    overview?: string;
    air_date: string | null;
    still_path: string | null;
    runtime: number | null;
  }[];
}
interface TmdbMovieDetail {
  id: number;
  imdb_id: string | null;
  title: string;
  overview?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  runtime: number | null;
  genres?: { name: string }[];
}
interface TmdbFindResult {
  tv_results?: TmdbTvResult[];
  movie_results?: TmdbMovieResult[];
  tv_episode_results?: {
    show_id: number;
    season_number: number;
    episode_number: number;
  }[];
}
