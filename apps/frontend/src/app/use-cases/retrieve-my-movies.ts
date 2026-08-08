import { inject, Injectable } from '@angular/core';
import { MoviesGateway } from '../domain/gateways/movies.gateway';
import { MoviesStore } from '../store/movies.store';
import { runQuery } from './run-query';

@Injectable()
export class RetrieveMyMovies {
  readonly #gateway = inject(MoviesGateway);
  readonly #store = inject(MoviesStore);

  execute(force = false): void {
    if (this.#store.loaded() && !force) {
      return;
    }
    this.#store.setLoading(true);
    runQuery(this.#gateway.getMyMovies(), {
      onResult: (movies) => this.#store.setMovies(movies),
      onError: () => this.#store.setLoading(false),
    });
  }
}
