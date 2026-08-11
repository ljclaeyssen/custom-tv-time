import { inject, Injectable } from '@angular/core';
import { NotificationGateway } from '../domain/gateways/notification.gateway';
import { TimelinesGateway } from '../domain/gateways/timelines.gateway';
import { TimelinesStore } from '../store/timelines.store';
import { runQuery } from './run-query';

@Injectable()
export class RetrieveTimelines {
  readonly #gateway = inject(TimelinesGateway);
  readonly #store = inject(TimelinesStore);
  readonly #notifications = inject(NotificationGateway);

  execute(force = false): void {
    if (this.#store.summariesLoaded() && !force) {
      return;
    }
    this.#store.setLoading(true);
    runQuery(this.#gateway.getTimelines(), {
      onResult: (summaries) => this.#store.setSummaries(summaries),
      onError: () => {
        this.#store.setLoading(false);
        this.#notifications.error('Impossible de charger les frises');
      },
    });
  }
}
