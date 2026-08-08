import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, first, tap } from 'rxjs';
import { ShowsGateway } from '../domain/gateways/shows.gateway';
import { ShowsStore } from '../store/shows.store';

@Injectable()
export class RetrieveWatchNext {
  readonly #gateway = inject(ShowsGateway);
  readonly #store = inject(ShowsStore);

  execute(force = false): void {
    if (this.#store.watchNextLoaded() && !force) {
      return;
    }
    this.#store.setLoading(true);
    this.#gateway
      .getWatchNext()
      .pipe(
        first(),
        tap((items) => this.#store.setWatchNext(items)),
        catchError(() => {
          this.#store.setLoading(false);
          return EMPTY;
        }),
      )
      .subscribe();
  }
}
