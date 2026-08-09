import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, first, Observable, tap } from 'rxjs';
import { NotificationGateway } from '../domain/gateways/notification.gateway';
import { ShowsGateway } from '../domain/gateways/shows.gateway';
import { ShowsStore } from '../store/shows.store';
import { RetrieveShowProgress } from './retrieve-show-progress';

@Injectable()
export class ToggleShowFollow {
  readonly #gateway = inject(ShowsGateway);
  readonly #store = inject(ShowsStore);
  readonly #retrieveShowProgress = inject(RetrieveShowProgress);
  readonly #notifications = inject(NotificationGateway);

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
        catchError(() => {
          this.#notifications.error(
            follow ? 'Impossible de suivre la série' : 'Impossible de ne plus suivre la série',
          );
          return EMPTY;
        }),
      )
      .subscribe();
  }
}
