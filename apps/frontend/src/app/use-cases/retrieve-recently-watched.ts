import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, first, tap } from 'rxjs';
import { ShowsGateway } from '../domain/gateways/shows.gateway';
import { ShowsStore } from '../store/shows.store';

@Injectable()
export class RetrieveRecentlyWatched {
  readonly #gateway = inject(ShowsGateway);
  readonly #store = inject(ShowsStore);

  execute(force = false): void {
    if (this.#store.recentlyWatchedLoaded() && !force) {
      return;
    }
    this.#gateway
      .getRecentlyWatched()
      .pipe(
        first(),
        tap((items) => this.#store.setRecentlyWatched(items)),
        catchError(() => EMPTY),
      )
      .subscribe();
  }
}
