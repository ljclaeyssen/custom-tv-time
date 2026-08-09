import { inject, Injectable } from '@angular/core';
import { NotificationGateway } from '../domain/gateways/notification.gateway';
import { ShowsGateway } from '../domain/gateways/shows.gateway';
import { ShowsStore } from '../store/shows.store';
import { runQuery } from './run-query';

@Injectable()
export class RetrieveShowProgress {
  readonly #gateway = inject(ShowsGateway);
  readonly #store = inject(ShowsStore);
  readonly #notifications = inject(NotificationGateway);

  execute(tmdbShowId: number): void {
    this.#store.setCurrentShow(null);
    this.#store.setLoading(true);
    runQuery(this.#gateway.getShowProgress(tmdbShowId), {
      onResult: (progress) => this.#store.setCurrentShow(progress),
      onError: () => {
        this.#store.setLoading(false);
        this.#notifications.error('Impossible de charger la série');
      },
    });
  }
}
