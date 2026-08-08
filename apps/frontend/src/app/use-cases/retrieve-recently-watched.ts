import { inject, Injectable } from '@angular/core';
import { ShowsGateway } from '../domain/gateways/shows.gateway';
import { ShowsStore } from '../store/shows.store';
import { runQuery } from './run-query';

@Injectable()
export class RetrieveRecentlyWatched {
  readonly #gateway = inject(ShowsGateway);
  readonly #store = inject(ShowsStore);

  execute(force = false): void {
    if (this.#store.recentlyWatchedLoaded() && !force) {
      return;
    }
    runQuery(this.#gateway.getRecentlyWatched(), {
      onResult: (items) => this.#store.setRecentlyWatched(items),
    });
  }
}
