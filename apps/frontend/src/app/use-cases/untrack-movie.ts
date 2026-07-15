import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, first, tap } from 'rxjs';
import { MoviesGateway } from '../domain/gateways/movies.gateway';
import { MoviesStore } from '../store/movies.store';

@Injectable()
export class UntrackMovie {
  readonly #gateway = inject(MoviesGateway);
  readonly #store = inject(MoviesStore);

  execute(tmdbMovieId: number): void {
    this.#gateway
      .untrack(tmdbMovieId)
      .pipe(
        first(),
        tap(() => this.#store.removeMovie(tmdbMovieId)),
        catchError(() => EMPTY),
      )
      .subscribe();
  }
}
