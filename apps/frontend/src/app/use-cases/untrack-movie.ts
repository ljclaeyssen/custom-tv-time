import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, first, tap } from 'rxjs';
import { MoviesGateway } from '../domain/gateways/movies.gateway';
import { NotificationGateway } from '../domain/gateways/notification.gateway';
import { MoviesStore } from '../store/movies.store';
import { StatsStore } from '../store/stats.store';

@Injectable()
export class UntrackMovie {
  readonly #gateway = inject(MoviesGateway);
  readonly #store = inject(MoviesStore);
  readonly #stats = inject(StatsStore);
  readonly #notifications = inject(NotificationGateway);

  execute(tmdbMovieId: number): void {
    this.#gateway
      .untrack(tmdbMovieId)
      .pipe(
        first(),
        tap(() => {
          this.#store.removeMovie(tmdbMovieId);
          this.#stats.invalidate();
        }),
        catchError(() => {
          this.#notifications.error('Film non retiré');
          return EMPTY;
        }),
      )
      .subscribe();
  }
}
