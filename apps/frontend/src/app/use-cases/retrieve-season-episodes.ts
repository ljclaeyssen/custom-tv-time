import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, first, tap } from 'rxjs';
import { ShowsGateway } from '../domain/gateways/shows.gateway';
import { ShowsStore } from '../store/shows.store';

@Injectable()
export class RetrieveSeasonEpisodes {
  readonly #gateway = inject(ShowsGateway);
  readonly #store = inject(ShowsStore);

  execute(tmdbShowId: number, seasonNumber: number): void {
    this.#store.setCurrentSeasonEpisodes([]);
    this.#store.setLoading(true);
    this.#gateway
      .getSeasonEpisodes(tmdbShowId, seasonNumber)
      .pipe(
        first(),
        tap((episodes) => this.#store.setCurrentSeasonEpisodes(episodes)),
        catchError((error: { message?: string }) => {
          this.#store.setError(error.message ?? 'Saison introuvable');
          return EMPTY;
        }),
      )
      .subscribe();
  }
}
