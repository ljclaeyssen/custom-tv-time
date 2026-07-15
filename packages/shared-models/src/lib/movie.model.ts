export interface TrackedMovie {
  id: string;
  userId: string;
  tmdbMovieId: number;
  imdbId: string | null;
  title: string;
  posterPath: string | null;
  releaseDate: string | null;
  watchedAt: string | null;
  addedAt: string;
}

export interface CatalogMovieDetail {
  tmdbId: number;
  imdbId: string | null;
  title: string;
  overview: string;
  posterPath: string | null;
  backdropPath: string | null;
  releaseDate: string | null;
  runtime: number | null;
  genres: string[];
}
