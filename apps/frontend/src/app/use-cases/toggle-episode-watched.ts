import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, first, tap } from 'rxjs';
import { ShowsGateway } from '../domain/gateways/shows.gateway';
import { ShowsStore } from '../store/shows.store';

@Injectable()
export class ToggleEpisodeWatched {
  readonly #gateway = inject(ShowsGateway);
  readonly #store = inject(ShowsStore);

  execute(tmdbShowId: number, season: number, episode: number, watched: boolean): void {
    // Optimiste : l'UI bascule tout de suite, rollback si l'API échoue.
    this.#store.updateEpisodeState(season, episode, watched);
    this.#store.invalidateLists();
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
