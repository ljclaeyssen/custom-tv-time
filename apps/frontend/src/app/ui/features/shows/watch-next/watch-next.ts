import { Component, computed, effect, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecentlyWatchedItem, WatchNextItem } from '../../../../domain/models/show.model';
import { ShowsStore } from '../../../../store/shows.store';
import { MarkWatchNextEpisodeWatched } from '../../../../use-cases/mark-watch-next-episode-watched';
import { RetrieveRecentlyWatched } from '../../../../use-cases/retrieve-recently-watched';
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
  readonly #retrieveRecent = inject(RetrieveRecentlyWatched);
  readonly #markWatched = inject(MarkWatchNextEpisodeWatched);

  protected readonly anchorRef = viewChild<ElementRef<HTMLElement>>('anchor');
  #positioned = false;

  // Affiché du plus ancien (en haut) au plus récent (en bas, collé à "À voir") :
  // en scrollant vers le haut on rencontre d'abord le dernier vu, puis on remonte le temps.
  protected readonly recentOldestFirst = computed(() => [...this.store.recentlyWatched()].reverse());

  constructor() {
    // Au premier chargement, on cale la vue sur "À voir" : l'historique
    // "Vu récemment" reste au-dessus, révélé en scrollant vers le haut (façon TV Time).
    effect(() => {
      const ready = this.store.watchNextLoaded() && this.store.recentlyWatchedLoaded();
      const anchor = this.anchorRef();
      if (ready && anchor && !this.#positioned && this.store.recentlyWatched().length > 0) {
        this.#positioned = true;
        requestAnimationFrame(() => anchor.nativeElement.scrollIntoView({ block: 'start' }));
      }
    });
  }

  ngOnInit(): void {
    this.#retrieveWatchNext.execute();
    this.#retrieveRecent.execute();
  }

  protected poster(item: WatchNextItem): string | null {
    return tmdbImage(item.show.posterPath, 'w185');
  }

  protected recentPoster(item: RecentlyWatchedItem): string | null {
    return tmdbImage(item.posterPath, 'w185');
  }

  protected episodeCode(item: WatchNextItem): string {
    return this.#code(item.nextEpisode.seasonNumber, item.nextEpisode.episodeNumber);
  }

  protected recentCode(item: RecentlyWatchedItem): string {
    return this.#code(item.season, item.episode);
  }

  protected relativeDate(iso: string | null): string {
    if (!iso) {
      return '';
    }
    const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
    if (days <= 0) return "aujourd'hui";
    if (days === 1) return 'hier';
    if (days < 7) return `il y a ${days} j`;
    if (days < 30) return `il y a ${Math.floor(days / 7)} sem`;
    if (days < 365) return `il y a ${Math.floor(days / 30)} mois`;
    const years = Math.floor(days / 365);
    return `il y a ${years} an${years > 1 ? 's' : ''}`;
  }

  protected markWatched(item: WatchNextItem): void {
    this.#markWatched.execute(item);
  }

  #code(season: number, episode: number): string {
    return `S${String(season).padStart(2, '0')} | E${String(episode).padStart(2, '0')}`;
  }
}
