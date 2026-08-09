import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, first } from 'rxjs';
import { MoviesGateway } from '../domain/gateways/movies.gateway';
import { NotificationGateway } from '../domain/gateways/notification.gateway';
import { MoviesStore } from '../store/movies.store';
import { StatsStore } from '../store/stats.store';

@Injectable()
export class SetMovieWatched {
  readonly #gateway = inject(MoviesGateway);
  readonly #store = inject(MoviesStore);
  readonly #stats = inject(StatsStore);
  readonly #notifications = inject(NotificationGateway);

  execute(tmdbMovieId: number, watched: boolean): void {
    // Optimiste : l'UI bascule tout de suite, rollback si l'API échoue.
    this.#store.setMovieWatched(tmdbMovieId, watched);
    this.#stats.invalidate();
    this.#gateway
      .setWatched(tmdbMovieId, watched)
      .pipe(
        first(),
        catchError(() => {
          this.#store.setMovieWatched(tmdbMovieId, !watched);
          this.#notifications.error('Modification non enregistrée');
          return EMPTY;
        }),
      )
      .subscribe();
  }
}
