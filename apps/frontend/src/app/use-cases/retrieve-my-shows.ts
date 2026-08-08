import { inject, Injectable } from '@angular/core';
import { ShowsGateway } from '../domain/gateways/shows.gateway';
import { ShowsStore } from '../store/shows.store';
import { runQuery } from './run-query';

@Injectable()
export class RetrieveMyShows {
  readonly #gateway = inject(ShowsGateway);
  readonly #store = inject(ShowsStore);

  execute(force = false): void {
    if (this.#store.myShowsLoaded() && !force) {
      return;
    }
    this.#store.setLoading(true);
    runQuery(this.#gateway.getMyShows(), {
      onResult: (items) => this.#store.setMyShows(items),
      onError: () => this.#store.setLoading(false),
    });
  }
}
