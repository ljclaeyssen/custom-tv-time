import { computed, Injectable, signal } from '@angular/core';
import { MovieProgress, TrackedMovie } from '../domain/models/movie.model';

interface MoviesState {
  movies: TrackedMovie[];
  loaded: boolean;
  loading: boolean;
  current: MovieProgress | null;
}

@Injectable({ providedIn: 'root' })
export class MoviesStore {
  readonly #state = signal<MoviesState>({ movies: [], loaded: false, loading: false, current: null });

  readonly movies = computed(() => this.#state().movies);
  readonly loaded = computed(() => this.#state().loaded);
  readonly loading = computed(() => this.#state().loading);
  readonly current = computed(() => this.#state().current);
  readonly watchlist = computed(() => this.#state().movies.filter((m) => m.watchedAt === null));
  readonly watched = computed(() =>
    this.#state()
      .movies.filter((m) => m.watchedAt !== null)
      .sort((a, b) => (b.watchedAt ?? '').localeCompare(a.watchedAt ?? '')),
  );

  setMovies(movies: TrackedMovie[]): void {
    this.#state.update((s) => ({ ...s, movies, loaded: true, loading: false }));
  }

  setCurrent(current: MovieProgress): void {
    this.#state.update((s) => ({ ...s, current, loading: false }));
  }

  upsertMovie(movie: TrackedMovie): void {
    this.#state.update((s) => {
      const exists = s.movies.some((m) => m.tmdbMovieId === movie.tmdbMovieId);
      return {
        ...s,
        movies: exists
          ? s.movies.map((m) => (m.tmdbMovieId === movie.tmdbMovieId ? movie : m))
          : [movie, ...s.movies],
        current: this.#patchCurrent(s.current, movie.tmdbMovieId, () => movie),
      };
    });
  }

  setMovieWatched(tmdbMovieId: number, watched: boolean): void {
    const watchedAt = watched ? new Date().toISOString() : null;
    this.#state.update((s) => ({
      ...s,
      movies: s.movies.map((m) => (m.tmdbMovieId === tmdbMovieId ? { ...m, watchedAt } : m)),
      current: this.#patchCurrent(s.current, tmdbMovieId, (tracked) =>
        tracked ? { ...tracked, watchedAt } : tracked,
      ),
    }));
  }

  removeMovie(tmdbMovieId: number): void {
    this.#state.update((s) => ({
      ...s,
      movies: s.movies.filter((m) => m.tmdbMovieId !== tmdbMovieId),
      current: this.#patchCurrent(s.current, tmdbMovieId, () => null),
    }));
  }

  /** Garde la fiche courante cohérente avec les actions faites depuis n'importe quel écran. */
  #patchCurrent(
    current: MovieProgress | null,
    tmdbMovieId: number,
    tracked: (previous: TrackedMovie | null) => TrackedMovie | null,
  ): MovieProgress | null {
    if (!current || current.detail.tmdbId !== tmdbMovieId) {
      return current;
    }
    return { ...current, tracked: tracked(current.tracked) };
  }

  setLoading(loading: boolean): void {
    this.#state.update((s) => ({ ...s, loading }));
  }

  /** Force un rechargement au prochain passage sur l'écran Films. */
  invalidate(): void {
    this.#state.update((s) => ({ ...s, loaded: false }));
  }
}
