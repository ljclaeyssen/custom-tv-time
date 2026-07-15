import { computed, Injectable, signal } from '@angular/core';
import {
  EpisodeWithState,
  MyShowItem,
  ShowProgress,
  WatchNextItem,
} from '../domain/models/show.model';

interface ShowsState {
  watchNext: WatchNextItem[];
  watchNextLoaded: boolean;
  myShows: MyShowItem[];
  myShowsLoaded: boolean;
  currentShow: ShowProgress | null;
  currentSeasonEpisodes: EpisodeWithState[];
  loading: boolean;
  error: string | null;
}

@Injectable({ providedIn: 'root' })
export class ShowsStore {
  readonly #state = signal<ShowsState>({
    watchNext: [],
    watchNextLoaded: false,
    myShows: [],
    myShowsLoaded: false,
    currentShow: null,
    currentSeasonEpisodes: [],
    loading: false,
    error: null,
  });

  readonly watchNext = computed(() => this.#state().watchNext);
  readonly watchNextLoaded = computed(() => this.#state().watchNextLoaded);
  readonly myShows = computed(() => this.#state().myShows);
  readonly myShowsLoaded = computed(() => this.#state().myShowsLoaded);
  readonly currentShow = computed(() => this.#state().currentShow);
  readonly currentSeasonEpisodes = computed(() => this.#state().currentSeasonEpisodes);
  readonly loading = computed(() => this.#state().loading);
  readonly error = computed(() => this.#state().error);

  setWatchNext(watchNext: WatchNextItem[]): void {
    this.#state.update((s) => ({ ...s, watchNext, watchNextLoaded: true, loading: false, error: null }));
  }

  removeWatchNextItem(tmdbShowId: number): void {
    this.#state.update((s) => ({
      ...s,
      watchNext: s.watchNext.filter((item) => item.show.tmdbShowId !== tmdbShowId),
    }));
  }

  replaceWatchNextItem(tmdbShowId: number, item: WatchNextItem | null): void {
    this.#state.update((s) => ({
      ...s,
      watchNext: item
        ? s.watchNext.map((existing) => (existing.show.tmdbShowId === tmdbShowId ? item : existing))
        : s.watchNext.filter((existing) => existing.show.tmdbShowId !== tmdbShowId),
    }));
  }

  setMyShows(myShows: MyShowItem[]): void {
    this.#state.update((s) => ({ ...s, myShows, myShowsLoaded: true, loading: false, error: null }));
  }

  setCurrentShow(currentShow: ShowProgress | null): void {
    this.#state.update((s) => ({ ...s, currentShow, loading: false, error: null }));
  }

  setCurrentSeasonEpisodes(currentSeasonEpisodes: EpisodeWithState[]): void {
    this.#state.update((s) => ({ ...s, currentSeasonEpisodes, loading: false, error: null }));
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
    this.#state.update((s) => ({ ...s, watchNextLoaded: false, myShowsLoaded: false }));
  }

  setLoading(loading: boolean): void {
    this.#state.update((s) => ({ ...s, loading }));
  }

  setError(error: string): void {
    this.#state.update((s) => ({ ...s, error, loading: false }));
  }
}
