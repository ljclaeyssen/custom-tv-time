import { inject, Injectable } from '@angular/core';
import { NotificationGateway } from '../domain/gateways/notification.gateway';
import { TimelinesGateway } from '../domain/gateways/timelines.gateway';
import { TimelinesStore } from '../store/timelines.store';
import { runQuery } from './run-query';

@Injectable()
export class RetrieveTimelineDetail {
  readonly #gateway = inject(TimelinesGateway);
  readonly #store = inject(TimelinesStore);
  readonly #notifications = inject(NotificationGateway);

  execute(slug: string): void {
    this.#store.setLoading(true);
    runQuery(this.#gateway.getTimelineDetail(slug), {
      onResult: (detail) => this.#store.setCurrent(detail),
      onError: () => {
        this.#store.setLoading(false);
        this.#notifications.error('Impossible de charger la frise');
      },
    });
  }
}
