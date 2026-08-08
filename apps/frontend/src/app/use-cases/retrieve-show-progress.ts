import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, first, tap } from 'rxjs';
import { ShowsGateway } from '../domain/gateways/shows.gateway';
import { ShowsStore } from '../store/shows.store';

@Injectable()
export class RetrieveShowProgress {
  readonly #gateway = inject(ShowsGateway);
  readonly #store = inject(ShowsStore);

  execute(tmdbShowId: number): void {
    this.#store.setCurrentShow(null);
    this.#store.setLoading(true);
    this.#gateway
      .getShowProgress(tmdbShowId)
      .pipe(
        first(),
        tap((progress) => this.#store.setCurrentShow(progress)),
        catchError(() => {
          this.#store.setLoading(false);
          return EMPTY;
        }),
      )
      .subscribe();
  }
}
