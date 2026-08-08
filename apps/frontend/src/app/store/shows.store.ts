import { computed, Injectable, signal } from '@angular/core';
import {
  EpisodeWithState,
  MyShowItem,
  RecentlyWatchedItem,
  ShowProgress,
  WatchNextItem,
} from '../domain/models/show.model';

interface ShowsState {
  watchNext: WatchNextItem[];
  watchNextLoaded: boolean;
  recentlyWatched: RecentlyWatchedItem[];
  recentlyWatchedLoaded: boolean;
  myShows: MyShowItem[];
  myShowsLoaded: boolean;
  currentShow: ShowProgress | null;
  currentSeasonEpisodes: EpisodeWithState[];
  loading: boolean;
}

@Injectable({ providedIn: 'root' })
export class ShowsStore {
  readonly #state = signal<ShowsState>({
    watchNext: [],
    watchNextLoaded: false,
    recentlyWatched: [],
    recentlyWatchedLoaded: false,
    myShows: [],
    myShowsLoaded: false,
    currentShow: null,
    currentSeasonEpisodes: [],
    loading: false,
  });

  readonly watchNext = computed(() => this.#state().watchNext);
  readonly watchNextLoaded = computed(() => this.#state().watchNextLoaded);
  readonly recentlyWatched = computed(() => this.#state().recentlyWatched);
  readonly recentlyWatchedLoaded = computed(() => this.#state().recentlyWatchedLoaded);
  readonly myShows = computed(() => this.#state().myShows);
  readonly myShowsLoaded = computed(() => this.#state().myShowsLoaded);
  readonly currentShow = computed(() => this.#state().currentShow);
  readonly currentSeasonEpisodes = computed(() => this.#state().currentSeasonEpisodes);
  readonly loading = computed(() => this.#state().loading);

  setWatchNext(watchNext: WatchNextItem[]): void {
    this.#state.update((s) => ({ ...s, watchNext, watchNextLoaded: true, loading: false }));
  }

  setRecentlyWatched(recentlyWatched: RecentlyWatchedItem[]): void {
    this.#state.update((s) => ({ ...s, recentlyWatched, recentlyWatchedLoaded: true }));
  }

  setMyShows(myShows: MyShowItem[]): void {
    this.#state.update((s) => ({ ...s, myShows, myShowsLoaded: true, loading: false }));
  }

  setCurrentShow(currentShow: ShowProgress | null): void {
    this.#state.update((s) => ({ ...s, currentShow, loading: false }));
  }

  setCurrentSeasonEpisodes(currentSeasonEpisodes: EpisodeWithState[]): void {
    this.#state.update((s) => ({ ...s, currentSeasonEpisodes, loading: false }));
  }

  updateEpisodeState(season: number, episode: number, watched: boolean): void {
    this.#state.update((s) => ({
      ...s,
      currentSeasonEpisodes: s.currentSeasonEpisodes.map((e) =>
        e.seasonNumber === season && e.episodeNumber === episode
          ? { ...e, watched, watchedAt: watched ? new Date().toISOString() : null }
          : e,
      ),
    }));
  }

  invalidateLists(): void {
    this.#state.update((s) => ({
      ...s,
      watchNextLoaded: false,
      myShowsLoaded: false,
      recentlyWatchedLoaded: false,
    }));
  }

  setLoading(loading: boolean): void {
    this.#state.update((s) => ({ ...s, loading }));
  }
}
