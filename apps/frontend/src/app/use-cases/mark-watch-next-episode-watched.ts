import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, first, switchMap, tap } from 'rxjs';
import { NotificationGateway } from '../domain/gateways/notification.gateway';
import { ShowsGateway } from '../domain/gateways/shows.gateway';
import { WatchNextItem } from '../domain/models/show.model';
import { ShowsStore } from '../store/shows.store';
import { StatsStore } from '../store/stats.store';
import { RetrieveRecentlyWatched } from './retrieve-recently-watched';

@Injectable()
export class MarkWatchNextEpisodeWatched {
  readonly #gateway = inject(ShowsGateway);
  readonly #store = inject(ShowsStore);
  readonly #stats = inject(StatsStore);
  readonly #retrieveRecent = inject(RetrieveRecentlyWatched);
  readonly #notifications = inject(NotificationGateway);

  execute(item: WatchNextItem): void {
    const { tmdbShowId } = item.show;
    const { seasonNumber, episodeNumber } = item.nextEpisode;
    this.#stats.invalidate();
    this.#gateway
      .markEpisodeWatched(tmdbShowId, seasonNumber, episodeNumber)
      .pipe(
        first(),
        // On recharge la liste complète : le prochain épisode de cette série
        // (ou sa disparition si à jour) est recalculé côté serveur.
        switchMap(() => this.#gateway.getWatchNext()),
        tap((items) => {
          this.#store.setWatchNext(items);
          // L'épisode qu'on vient de cocher remonte en tête de "Vu récemment".
          this.#retrieveRecent.execute(true);
        }),
        catchError(() => {
          this.#notifications.error('Épisode non enregistré');
          return EMPTY;
        }),
      )
      .subscribe();
  }
}
