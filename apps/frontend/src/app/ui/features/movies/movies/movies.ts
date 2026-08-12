import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TrackedMovie } from '../../../../domain/models/movie.model';
import { MoviesStore } from '../../../../store/movies.store';
import { RetrieveMyMovies } from '../../../../use-cases/retrieve-my-movies';
import { SetMovieWatched } from '../../../../use-cases/set-movie-watched';
import { UntrackMovie } from '../../../../use-cases/untrack-movie';
import { tmdbImage } from '../../../../utils/tmdb-image';
import { EmptyState } from '../../../shared/empty-state/empty-state';
import { PosterImg } from '../../../shared/poster-img/poster-img';

@Component({
  selector: 'app-movies',
  imports: [EmptyState, PosterImg, RouterLink],
  templateUrl: './movies.html',
  styleUrl: './movies.scss',
})
export class Movies implements OnInit {
  protected readonly store = inject(MoviesStore);
  protected readonly tab = signal<'watchlist' | 'watched'>('watchlist');
  readonly #retrieveMyMovies = inject(RetrieveMyMovies);
  readonly #setMovieWatched = inject(SetMovieWatched);
  readonly #untrackMovie = inject(UntrackMovie);

  protected readonly visible = computed(() =>
    this.tab() === 'watchlist' ? this.store.watchlist() : this.store.watched(),
  );

  ngOnInit(): void {
    this.#retrieveMyMovies.execute();
  }

  protected poster(movie: TrackedMovie): string | null {
    return tmdbImage(movie.posterPath, 'w342');
  }

  protected year(movie: TrackedMovie): string | null {
    return movie.releaseDate ? movie.releaseDate.slice(0, 4) : null;
  }

  protected setWatched(movie: TrackedMovie, watched: boolean): void {
    this.#setMovieWatched.execute(movie.tmdbMovieId, watched);
  }

  protected remove(movie: TrackedMovie): void {
    this.#untrackMovie.execute(movie.tmdbMovieId);
  }
}
