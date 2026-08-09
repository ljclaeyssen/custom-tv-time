import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, first, tap } from 'rxjs';
import { MoviesGateway } from '../domain/gateways/movies.gateway';
import { NotificationGateway } from '../domain/gateways/notification.gateway';
import { MoviesStore } from '../store/movies.store';
import { StatsStore } from '../store/stats.store';

@Injectable()
export class TrackMovie {
  readonly #gateway = inject(MoviesGateway);
  readonly #store = inject(MoviesStore);
  readonly #stats = inject(StatsStore);
  readonly #notifications = inject(NotificationGateway);

  execute(tmdbMovieId: number, watched: boolean): void {
    this.#gateway
      .track(tmdbMovieId, watched)
      .pipe(
        first(),
        tap((movie) => {
          this.#store.upsertMovie(movie);
          if (watched) {
            this.#stats.invalidate();
          }
        }),
        catchError(() => {
          this.#notifications.error('Film non ajouté');
          return EMPTY;
        }),
      )
      .subscribe();
  }
}
