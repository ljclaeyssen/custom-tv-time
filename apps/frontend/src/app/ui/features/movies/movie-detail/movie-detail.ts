import { DatePipe, Location } from '@angular/common';
import { Component, computed, inject, input, numberAttribute, OnInit } from '@angular/core';
import { MoviesStore } from '../../../../store/movies.store';
import { RetrieveMovieProgress } from '../../../../use-cases/retrieve-movie-progress';
import { SetMovieWatched } from '../../../../use-cases/set-movie-watched';
import { TrackMovie } from '../../../../use-cases/track-movie';
import { UntrackMovie } from '../../../../use-cases/untrack-movie';
import { tmdbImage } from '../../../../utils/tmdb-image';
import { EmptyState } from '../../../shared/empty-state/empty-state';
import { PosterImg } from '../../../shared/poster-img/poster-img';

@Component({
  selector: 'app-movie-detail',
  imports: [DatePipe, EmptyState, PosterImg],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.scss',
})
export class MovieDetail implements OnInit {
  readonly tmdbId = input.required({ transform: numberAttribute });

  protected readonly store = inject(MoviesStore);
  readonly #location = inject(Location);
  readonly #retrieveMovieProgress = inject(RetrieveMovieProgress);
  readonly #trackMovie = inject(TrackMovie);
  readonly #setMovieWatched = inject(SetMovieWatched);
  readonly #untrackMovie = inject(UntrackMovie);

  /** La fiche affichée — jamais celle d'une navigation précédente. */
  protected readonly movie = computed(() => {
    const current = this.store.current();
    return current?.detail.tmdbId === this.tmdbId() ? current : null;
  });

  protected readonly sublabel = computed(() => {
    const detail = this.movie()?.detail;
    if (!detail) {
      return null;
    }
    const parts = [
      detail.releaseDate?.slice(0, 4),
      detail.runtime ? `${detail.runtime} min` : null,
      detail.genres.length ? detail.genres.join(', ') : null,
    ].filter(Boolean);
    return parts.length ? parts.join(' · ') : null;
  });

  ngOnInit(): void {
    this.#retrieveMovieProgress.execute(this.tmdbId());
  }

  protected back(): void {
    this.#location.back();
  }

  protected poster(path: string | null): string | null {
    return tmdbImage(path, 'w342');
  }

  protected markWatched(): void {
    if (this.movie()?.tracked) {
      this.#setMovieWatched.execute(this.tmdbId(), true);
    } else {
      this.#trackMovie.execute(this.tmdbId(), true);
    }
  }

  protected markUnwatched(): void {
    this.#setMovieWatched.execute(this.tmdbId(), false);
  }

  protected addToWatchlist(): void {
    this.#trackMovie.execute(this.tmdbId(), false);
  }

  protected remove(): void {
    this.#untrackMovie.execute(this.tmdbId());
  }
}
