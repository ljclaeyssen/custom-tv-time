import { Component, computed, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MyShowItem } from '../../../../domain/models/show.model';
import { ShowsStore } from '../../../../store/shows.store';
import { RetrieveMyShows } from '../../../../use-cases/retrieve-my-shows';
import { tmdbImage } from '../../../../utils/tmdb-image';
import { EmptyState } from '../../../shared/empty-state/empty-state';
import { PosterCard } from '../../../shared/poster-card/poster-card';

const STATUS_ORDER: Record<string, number> = {
  watching: 0,
  up_to_date: 1,
  not_started: 2,
  watch_later: 3,
  stopped: 4,
};

@Component({
  selector: 'app-my-shows',
  imports: [RouterLink, EmptyState, PosterCard],
  templateUrl: './my-shows.html',
  styleUrl: './my-shows.scss',
})
export class MyShows implements OnInit {
  protected readonly store = inject(ShowsStore);
  readonly #retrieveMyShows = inject(RetrieveMyShows);

  protected readonly sorted = computed(() =>
    [...this.store.myShows()].sort(
      (a, b) =>
        (STATUS_ORDER[a.show.status] ?? 9) - (STATUS_ORDER[b.show.status] ?? 9) ||
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
