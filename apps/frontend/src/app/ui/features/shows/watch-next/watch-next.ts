import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WatchNextItem } from '../../../../domain/models/show.model';
import { ShowsStore } from '../../../../store/shows.store';
import { MarkWatchNextEpisodeWatched } from '../../../../use-cases/mark-watch-next-episode-watched';
import { RetrieveWatchNext } from '../../../../use-cases/retrieve-watch-next';
import { tmdbImage } from '../../../../utils/tmdb-image';
import { EmptyState } from '../../../shared/empty-state/empty-state';

@Component({
  selector: 'app-watch-next',
  imports: [RouterLink, EmptyState],
  templateUrl: './watch-next.html',
  styleUrl: './watch-next.scss',
})
export class WatchNext implements OnInit {
  protected readonly store = inject(ShowsStore);
  readonly #retrieveWatchNext = inject(RetrieveWatchNext);
  readonly #markWatched = inject(MarkWatchNextEpisodeWatched);

  ngOnInit(): void {
    this.#retrieveWatchNext.execute();
  }

  protected poster(item: WatchNextItem): string | null {
    return tmdbImage(item.show.posterPath, 'w185');
  }

  protected episodeCode(item: WatchNextItem): string {
    const s = String(item.nextEpisode.seasonNumber).padStart(2, '0');
    const e = String(item.nextEpisode.episodeNumber).padStart(2, '0');
    return `S${s} | E${e}`;
  }

  protected markWatched(item: WatchNextItem): void {
    this.#markWatched.execute(item);
  }
}
