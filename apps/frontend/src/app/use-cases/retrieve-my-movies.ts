import { inject, Injectable } from '@angular/core';
import { MoviesGateway } from '../domain/gateways/movies.gateway';
import { NotificationGateway } from '../domain/gateways/notification.gateway';
import { MoviesStore } from '../store/movies.store';
import { runQuery } from './run-query';

@Injectable()
export class RetrieveMyMovies {
  readonly #gateway = inject(MoviesGateway);
  readonly #store = inject(MoviesStore);
  readonly #notifications = inject(NotificationGateway);

  execute(force = false): void {
    if (this.#store.loaded() && !force) {
      return;
    }
    this.#store.setLoading(true);
    runQuery(this.#gateway.getMyMovies(), {
      onResult: (movies) => this.#store.setMovies(movies),
      onError: () => {
        this.#store.setLoading(false);
        this.#notifications.error('Impossible de charger vos films');
      },
    });
  }
}
