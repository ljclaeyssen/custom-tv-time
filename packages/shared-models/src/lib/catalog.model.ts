export interface CatalogSearchResult {
  tmdbId: number;
  type: 'show' | 'movie';
  name: string;
  posterPath: string | null;
  year: string | null;
  overview: string;
}
