import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, first, tap } from 'rxjs';
import { NotificationGateway } from '../domain/gateways/notification.gateway';
import { TimelinesGateway } from '../domain/gateways/timelines.gateway';
import { MoviesStore } from '../store/movies.store';
import { ShowsStore } from '../store/shows.store';
import { StatsStore } from '../store/stats.store';
import { TimelinesStore } from '../store/timelines.store';
import { RetrieveTimelineDetail } from './retrieve-timeline-detail';

/**
 * « Marquer vu » depuis une frise : le backend track le film ou suit la série
 * et marque la saison — tous les écrans qui en dépendent sont donc invalidés.
 */
@Injectable()
export class WatchTimelineItem {
  readonly #gateway = inject(TimelinesGateway);
  readonly #timelines = inject(TimelinesStore);
  readonly #shows = inject(ShowsStore);
  readonly #movies = inject(MoviesStore);
  readonly #stats = inject(StatsStore);
  readonly #retrieveTimelineDetail = inject(RetrieveTimelineDetail);
  readonly #notifications = inject(NotificationGateway);

  execute(slug: string, itemId: string): void {
    this.#gateway
      .watchItem(slug, itemId)
      .pipe(
        first(),
        tap(() => {
          this.#retrieveTimelineDetail.execute(slug);
          this.#timelines.invalidate();
          this.#shows.invalidateLists();
          this.#movies.invalidate();
          this.#stats.invalidate();
        }),
        catchError(() => {
          this.#notifications.error('Visionnage non enregistré');
          return EMPTY;
        }),
      )
      .subscribe();
  }
}
