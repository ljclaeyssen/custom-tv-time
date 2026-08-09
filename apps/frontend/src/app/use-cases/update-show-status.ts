import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, first, tap } from 'rxjs';
import { NotificationGateway } from '../domain/gateways/notification.gateway';
import { ShowsGateway } from '../domain/gateways/shows.gateway';
import { FollowStatus } from '../domain/models/show.model';
import { ShowsStore } from '../store/shows.store';
import { RetrieveShowProgress } from './retrieve-show-progress';

@Injectable()
export class UpdateShowStatus {
  readonly #gateway = inject(ShowsGateway);
  readonly #store = inject(ShowsStore);
  readonly #retrieveShowProgress = inject(RetrieveShowProgress);
  readonly #notifications = inject(NotificationGateway);

  execute(tmdbShowId: number, status: FollowStatus): void {
    this.#gateway
      .updateStatus(tmdbShowId, status)
      .pipe(
        first(),
        tap(() => {
          this.#store.invalidateLists();
          this.#retrieveShowProgress.execute(tmdbShowId);
        }),
        catchError(() => {
          this.#notifications.error('Statut non enregistré');
          return EMPTY;
        }),
      )
      .subscribe();
  }
}
