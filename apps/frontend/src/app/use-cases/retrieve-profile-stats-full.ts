import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, first, tap } from 'rxjs';
import { StatsGateway } from '../domain/gateways/stats.gateway';
import { StatsStore } from '../store/stats.store';

@Injectable()
export class RetrieveProfileStatsFull {
  readonly #gateway = inject(StatsGateway);
  readonly #store = inject(StatsStore);

  execute(): void {
    if (this.#store.stats()) {
      return;
    }
    this.#store.setLoading(true);
    this.#gateway
      .getStats()
      .pipe(
        first(),
        tap((stats) => this.#store.setStats(stats)),
        catchError((error: { message?: string }) => {
          this.#store.setError(error.message ?? 'Stats indisponibles');
          return EMPTY;
        }),
      )
      .subscribe();
  }
}
