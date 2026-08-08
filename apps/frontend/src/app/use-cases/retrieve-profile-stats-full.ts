import { inject, Injectable } from '@angular/core';
import { StatsGateway } from '../domain/gateways/stats.gateway';
import { StatsStore } from '../store/stats.store';
import { runQuery } from './run-query';

@Injectable()
export class RetrieveProfileStatsFull {
  readonly #gateway = inject(StatsGateway);
  readonly #store = inject(StatsStore);

  execute(): void {
    if (this.#store.stats()) {
      return;
    }
    this.#store.setLoading(true);
    runQuery(this.#gateway.getStats(), {
      onResult: (stats) => this.#store.setStats(stats),
      onError: () => this.#store.setError('Stats indisponibles'),
    });
  }
}
