import { inject, Injectable } from '@angular/core';
import { ShowsGateway } from '../domain/gateways/shows.gateway';
import { ShowsStore } from '../store/shows.store';
import { runQuery } from './run-query';

@Injectable()
export class RetrieveSeasonEpisodes {
  readonly #gateway = inject(ShowsGateway);
  readonly #store = inject(ShowsStore);

  execute(tmdbShowId: number, seasonNumber: number): void {
    this.#store.setCurrentSeasonEpisodes([]);
    this.#store.setLoading(true);
    runQuery(this.#gateway.getSeasonEpisodes(tmdbShowId, seasonNumber), {
      onResult: (episodes) => this.#store.setCurrentSeasonEpisodes(episodes),
      onError: () => this.#store.setLoading(false),
    });
  }
}
