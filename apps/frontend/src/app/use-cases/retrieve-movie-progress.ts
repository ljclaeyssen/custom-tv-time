import { inject, Injectable } from '@angular/core';
import { MoviesGateway } from '../domain/gateways/movies.gateway';
import { NotificationGateway } from '../domain/gateways/notification.gateway';
import { MoviesStore } from '../store/movies.store';
import { runQuery } from './run-query';

@Injectable()
export class RetrieveMovieProgress {
  readonly #gateway = inject(MoviesGateway);
  readonly #store = inject(MoviesStore);
  readonly #notifications = inject(NotificationGateway);

  execute(tmdbMovieId: number): void {
    this.#store.setLoading(true);
    runQuery(this.#gateway.getMovieProgress(tmdbMovieId), {
      onResult: (progress) => this.#store.setCurrent(progress),
      onError: () => {
        this.#store.setLoading(false);
        this.#notifications.error('Impossible de charger le film');
      },
    });
  }
}
