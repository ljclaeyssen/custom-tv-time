import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, first, tap } from 'rxjs';
import { MoviesGateway } from '../domain/gateways/movies.gateway';
import { MoviesStore } from '../store/movies.store';
import { StatsStore } from '../store/stats.store';

@Injectable()
export class TrackMovie {
  readonly #gateway = inject(MoviesGateway);
  readonly #store = inject(MoviesStore);
  readonly #stats = inject(StatsStore);

  execute(tmdbMovieId: number, watched: boolean): void {
    this.#gateway
      .track(tmdbMovieId, watched)
      .pipe(
        first(),
        tap((movie) => {
          this.#store.upsertMovie(movie);
          if (watched) {
            this.#stats.invalidate();
          }
        }),
        catchError(() => EMPTY),
      )
      .subscribe();
  }
}
