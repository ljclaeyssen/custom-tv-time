import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, first } from 'rxjs';
import { MoviesGateway } from '../domain/gateways/movies.gateway';
import { MoviesStore } from '../store/movies.store';

@Injectable()
export class SetMovieWatched {
  readonly #gateway = inject(MoviesGateway);
  readonly #store = inject(MoviesStore);

  execute(tmdbMovieId: number, watched: boolean): void {
    // Optimiste : l'UI bascule tout de suite, rollback si l'API échoue.
    this.#store.setMovieWatched(tmdbMovieId, watched);
    this.#gateway
      .setWatched(tmdbMovieId, watched)
      .pipe(
        first(),
        catchError(() => {
          this.#store.setMovieWatched(tmdbMovieId, !watched);
          return EMPTY;
        }),
      )
      .subscribe();
  }
}
