import {
  CatalogEpisode,
  CatalogMovieDetail,
  CatalogSearchResult,
  CatalogShowDetail,
} from '../models/catalog.model';

export abstract class CatalogPort {
  abstract search(query: string, type: 'show' | 'movie' | 'all'): Promise<CatalogSearchResult[]>;
  abstract getShowDetail(tmdbId: number): Promise<CatalogShowDetail>;
  abstract getSeasonEpisodes(tmdbId: number, seasonNumber: number): Promise<CatalogEpisode[]>;
  abstract getMovieDetail(tmdbId: number): Promise<CatalogMovieDetail>;
  abstract findShowByTvdbId(tvdbId: number): Promise<{ tmdbId: number; name: string; posterPath: string | null } | null>;
  abstract findEpisodeByTvdbId(
    tvdbEpisodeId: number,
  ): Promise<{ tmdbShowId: number; season: number; episode: number } | null>;
  abstract findMovieByImdbId(imdbId: string): Promise<{ tmdbId: number; title: string; posterPath: string | null; releaseDate: string | null } | null>;
}
