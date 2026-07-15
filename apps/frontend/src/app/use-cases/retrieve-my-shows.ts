import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, first, tap } from 'rxjs';
import { ShowsGateway } from '../domain/gateways/shows.gateway';
import { ShowsStore } from '../store/shows.store';

@Injectable()
export class RetrieveMyShows {
  readonly #gateway = inject(ShowsGateway);
  readonly #store = inject(ShowsStore);

  execute(force = false): void {
    if (this.#store.myShowsLoaded() && !force) {
      return;
    }
    this.#store.setLoading(true);
    this.#gateway
      .getMyShows()
      .pipe(
        first(),
        tap((items) => this.#store.setMyShows(items)),
        catchError((error: { message?: string }) => {
          this.#store.setError(error.message ?? 'Impossible de charger vos séries');
          return EMPTY;
        }),
      )
      .subscribe();
  }
}
