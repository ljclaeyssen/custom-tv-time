import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, first, switchMap, tap } from 'rxjs';
import { ShowsGateway } from '../domain/gateways/shows.gateway';
import { WatchNextItem } from '../domain/models/show.model';
import { ShowsStore } from '../store/shows.store';

@Injectable()
export class MarkWatchNextEpisodeWatched {
  readonly #gateway = inject(ShowsGateway);
  readonly #store = inject(ShowsStore);

  execute(item: WatchNextItem): void {
    const { tmdbShowId } = item.show;
    const { seasonNumber, episodeNumber } = item.nextEpisode;
    this.#gateway
      .markEpisodeWatched(tmdbShowId, seasonNumber, episodeNumber)
      .pipe(
        first(),
        // On recharge la liste complète : le prochain épisode de cette série
        // (ou sa disparition si à jour) est recalculé côté serveur.
        switchMap(() => this.#gateway.getWatchNext()),
        tap((items) => this.#store.setWatchNext(items)),
        catchError(() => EMPTY),
      )
      .subscribe();
  }
}
