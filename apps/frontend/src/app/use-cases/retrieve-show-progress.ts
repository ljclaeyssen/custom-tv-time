import { inject, Injectable } from '@angular/core';
import { ShowsGateway } from '../domain/gateways/shows.gateway';
import { ShowsStore } from '../store/shows.store';
import { runQuery } from './run-query';

@Injectable()
export class RetrieveShowProgress {
  readonly #gateway = inject(ShowsGateway);
  readonly #store = inject(ShowsStore);

  execute(tmdbShowId: number): void {
    this.#store.setCurrentShow(null);
    this.#store.setLoading(true);
    runQuery(this.#gateway.getShowProgress(tmdbShowId), {
      onResult: (progress) => this.#store.setCurrentShow(progress),
      onError: () => this.#store.setLoading(false),
    });
  }
}
