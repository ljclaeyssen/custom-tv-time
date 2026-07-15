import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, first, tap } from 'rxjs';
import { MoviesGateway } from '../domain/gateways/movies.gateway';
import { MoviesStore } from '../store/movies.store';

@Injectable()
export class TrackMovie {
  readonly #gateway = inject(MoviesGateway);
  readonly #store = inject(MoviesStore);

  execute(tmdbMovieId: number, watched: boolean): void {
    this.#gateway
      .track(tmdbMovieId, watched)
      .pipe(
        first(),
        tap((movie) => this.#store.upsertMovie(movie)),
        catchError(() => EMPTY),
      )
      .subscribe();
  }
}
