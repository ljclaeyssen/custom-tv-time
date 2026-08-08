import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, first, tap } from 'rxjs';
import { MoviesGateway } from '../domain/gateways/movies.gateway';
import { MoviesStore } from '../store/movies.store';

@Injectable()
export class RetrieveMyMovies {
  readonly #gateway = inject(MoviesGateway);
  readonly #store = inject(MoviesStore);

  execute(force = false): void {
    if (this.#store.loaded() && !force) {
      return;
    }
    this.#store.setLoading(true);
    this.#gateway
      .getMyMovies()
      .pipe(
        first(),
        tap((movies) => this.#store.setMovies(movies)),
        catchError(() => {
          this.#store.setLoading(false);
          return EMPTY;
        }),
      )
      .subscribe();
  }
}
