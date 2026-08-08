import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, first } from 'rxjs';
import { ShowsGateway } from '../domain/gateways/shows.gateway';
import { ShowsStore } from '../store/shows.store';
import { StatsStore } from '../store/stats.store';

@Injectable()
export class ToggleEpisodeWatched {
  readonly #gateway = inject(ShowsGateway);
  readonly #store = inject(ShowsStore);
  readonly #stats = inject(StatsStore);

  execute(tmdbShowId: number, season: number, episode: number, watched: boolean): void {
    // Optimiste : l'UI bascule tout de suite, rollback si l'API échoue.
    this.#store.updateEpisodeState(season, episode, watched);
    this.#store.invalidateLists();
    this.#stats.invalidate();
    const call = watched
      ? this.#gateway.markEpisodeWatched(tmdbShowId, season, episode)
      : this.#gateway.unmarkEpisodeWatched(tmdbShowId, season, episode);
    call
      .pipe(
        first(),
        catchError(() => {
          this.#store.updateEpisodeState(season, episode, !watched);
          return EMPTY;
        }),
      )
      .subscribe();
  }
}
