import { Component, computed, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FOLLOW_STATUS_META } from '../../../shared/follow-status-meta';
import { MyShowItem } from '../../../../domain/models/show.model';
import { ShowsStore } from '../../../../store/shows.store';
import { RetrieveMyShows } from '../../../../use-cases/retrieve-my-shows';
import { tmdbImage } from '../../../../utils/tmdb-image';
import { EmptyState } from '../../../shared/empty-state/empty-state';
import { PosterCard } from '../../../shared/poster-card/poster-card';

@Component({
  selector: 'app-my-shows',
  imports: [RouterLink, EmptyState, PosterCard],
  templateUrl: './my-shows.html',
})
export class MyShows implements OnInit {
  protected readonly store = inject(ShowsStore);
  readonly #retrieveMyShows = inject(RetrieveMyShows);

  protected readonly sorted = computed(() =>
    [...this.store.myShows()].sort(
      (a, b) =>
        // Repli ?? 9 : la colonne status est un text libre en base, un statut
        // inattendu ne doit pas faire planter la page, juste finir en bas.
        (FOLLOW_STATUS_META[a.show.status]?.order ?? 9) -
          (FOLLOW_STATUS_META[b.show.status]?.order ?? 9) ||
        a.show.name.localeCompare(b.show.name),
    ),
  );

  ngOnInit(): void {
    this.#retrieveMyShows.execute();
  }

  protected poster(item: MyShowItem): string | null {
    return tmdbImage(item.show.posterPath, 'w342');
  }

  protected sublabel(item: MyShowItem): string {
    if (item.totalEpisodes === 0) {
      return `${item.watchedCount} vus`;
    }
    return `${item.watchedCount} / ${item.totalEpisodes}`;
  }
}
