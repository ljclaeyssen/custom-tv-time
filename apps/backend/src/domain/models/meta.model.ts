export interface ShowMeta {
  tmdbShowId: number;
  genres: string[];
  episodeRuntime: number | null;
}

export interface MovieMeta {
  tmdbMovieId: number;
  runtime: number | null;
}
