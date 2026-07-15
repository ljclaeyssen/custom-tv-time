import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, first, tap } from 'rxjs';
import { ShowsGateway } from '../domain/gateways/shows.gateway';
import { ShowsStore } from '../store/shows.store';
import { RetrieveShowProgress } from './retrieve-show-progress';

@Injectable()
export class MarkSeasonWatched {
  readonly #gateway = inject(ShowsGateway);
  readonly #store = inject(ShowsStore);
  readonly #retrieveShowProgress = inject(RetrieveShowProgress);

  execute(tmdbShowId: number, seasonNumber: number): void {
    this.#gateway
      .markSeasonWatched(tmdbShowId, seasonNumber)
      .pipe(
        first(),
        tap(() => {
          this.#store.invalidateLists();
          this.#retrieveShowProgress.execute(tmdbShowId);
        }),
        catchError(() => EMPTY),
      )
      .subscribe();
  }
}
