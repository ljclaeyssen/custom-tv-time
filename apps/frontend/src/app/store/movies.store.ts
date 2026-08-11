import { computed, Injectable, signal } from '@angular/core';
import { TrackedMovie } from '../domain/models/movie.model';

interface MoviesState {
  movies: TrackedMovie[];
  loaded: boolean;
  loading: boolean;
}

@Injectable({ providedIn: 'root' })
export class MoviesStore {
  readonly #state = signal<MoviesState>({ movies: [], loaded: false, loading: false });

  readonly movies = computed(() => this.#state().movies);
  readonly loaded = computed(() => this.#state().loaded);
  readonly loading = computed(() => this.#state().loading);
  readonly watchlist = computed(() => this.#state().movies.filter((m) => m.watchedAt === null));
  readonly watched = computed(() =>
    this.#state()
      .movies.filter((m) => m.watchedAt !== null)
      .sort((a, b) => (b.watchedAt ?? '').localeCompare(a.watchedAt ?? '')),
  );

  setMovies(movies: TrackedMovie[]): void {
    this.#state.update((s) => ({ ...s, movies, loaded: true, loading: false }));
  }

  upsertMovie(movie: TrackedMovie): void {
    this.#state.update((s) => {
      const exists = s.movies.some((m) => m.tmdbMovieId === movie.tmdbMovieId);
      return {
        ...s,
        movies: exists
          ? s.movies.map((m) => (m.tmdbMovieId === movie.tmdbMovieId ? movie : m))
          : [movie, ...s.movies],
      };
    });
  }

  setMovieWatched(tmdbMovieId: number, watched: boolean): void {
    this.#state.update((s) => ({
      ...s,
      movies: s.movies.map((m) =>
        m.tmdbMovieId === tmdbMovieId
          ? { ...m, watchedAt: watched ? new Date().toISOString() : null }
          : m,
      ),
    }));
  }

  removeMovie(tmdbMovieId: number): void {
    this.#state.update((s) => ({
      ...s,
      movies: s.movies.filter((m) => m.tmdbMovieId !== tmdbMovieId),
    }));
  }

  setLoading(loading: boolean): void {
    this.#state.update((s) => ({ ...s, loading }));
  }

  /** Force un rechargement au prochain passage sur l'écran Films. */
  invalidate(): void {
    this.#state.update((s) => ({ ...s, loaded: false }));
  }
}
