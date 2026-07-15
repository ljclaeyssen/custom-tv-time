import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, first, Observable, tap } from 'rxjs';
import { ShowsGateway } from '../domain/gateways/shows.gateway';
import { ShowsStore } from '../store/shows.store';
import { RetrieveShowProgress } from './retrieve-show-progress';

@Injectable()
export class ToggleShowFollow {
  readonly #gateway = inject(ShowsGateway);
  readonly #store = inject(ShowsStore);
  readonly #retrieveShowProgress = inject(RetrieveShowProgress);

  execute(tmdbShowId: number, follow: boolean): void {
    const call: Observable<unknown> = follow
      ? this.#gateway.follow(tmdbShowId)
      : this.#gateway.unfollow(tmdbShowId);
    call
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
