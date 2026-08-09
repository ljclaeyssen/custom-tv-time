import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { CatalogGateway } from '../domain/gateways/catalog.gateway';
import { MoviesGateway } from '../domain/gateways/movies.gateway';
import { NotificationGateway } from '../domain/gateways/notification.gateway';
import { ProfileGateway } from '../domain/gateways/profile.gateway';
import { ShowsGateway } from '../domain/gateways/shows.gateway';
import { StatsGateway } from '../domain/gateways/stats.gateway';
import { TokenStorageGateway } from '../domain/gateways/token-storage.gateway';
import { CatalogSearchResult } from '../domain/models/catalog.model';
import { TrackedMovie } from '../domain/models/movie.model';
import { ProfileStatsFull } from '../domain/models/stats.model';
import {
  EpisodeWithState,
  FollowedShow,
  FollowStatus,
  MyShowItem,
  RecentlyWatchedItem,
  ShowProgress,
  WatchNextItem,
} from '../domain/models/show.model';
import { Profile } from '../domain/models/user.model';

export const FAKE_PROFILE: Profile = {
  user: {
    id: 'user-1',
    discordId: 'discord-1',
    username: 'testeur',
    avatarUrl: null,
    createdAt: '2026-01-01T00:00:00.000Z',
  },
  stats: { showsFollowed: 0, episodesWatched: 0, moviesWatched: 0, moviesInWatchlist: 0 },
};

export const FAKE_FOLLOWED_SHOW: FollowedShow = {
  id: 'follow-1',
  userId: 'user-1',
  tmdbShowId: 1,
  tvdbId: null,
  name: 'Série de test',
  posterPath: null,
  status: FollowStatus.Watching,
  followedAt: '2026-01-01T00:00:00.000Z',
};

export const FAKE_SHOW_PROGRESS: ShowProgress = {
  detail: {
    tmdbId: 1,
    name: 'Série de test',
    overview: '',
    posterPath: null,
    backdropPath: null,
    firstAirDate: null,
    status: 'Ended',
    inProduction: false,
    numberOfEpisodes: 0,
    numberOfSeasons: 0,
    episodeRuntime: null,
    genres: [],
    seasons: [],
  },
  followed: false,
  status: null,
  watchedCount: 0,
  seasons: [],
};

export const FAKE_TRACKED_MOVIE: TrackedMovie = {
  id: 'movie-1',
  userId: 'user-1',
  tmdbMovieId: 1,
  imdbId: null,
  title: 'Film de test',
  posterPath: null,
  releaseDate: null,
  watchedAt: null,
  addedAt: '2026-01-01T00:00:00.000Z',
};

export const FAKE_STATS: ProfileStatsFull = {
  screenTime: { totalMinutes: 0, seriesMinutes: 0, moviesMinutes: 0, equivalences: [], estimated: false },
  genres: [],
  monthly: [],
  quantileThresholds: [],
  annual: [],
  records: { mostActiveYear: null, biggestMonth: null, longestStreakDays: 0, biggestBingeDay: null },
  generatedAt: '2026-01-01T00:00:00.000Z',
};

/** Base des adaptateurs mémoire : données pilotables + échec simulable. */
abstract class FailableGateway {
  #failure: Error | null = null;

  /** Les prochains appels échoueront avec cette erreur. */
  failWith(error: Error): void {
    this.#failure = error;
  }

  protected result<T>(value: () => T): Observable<T> {
    return this.#failure ? throwError(() => this.#failure) : of(value());
  }
}

@Injectable()
export class InMemoryProfileGateway extends FailableGateway implements ProfileGateway {
  #profile: Profile = FAKE_PROFILE;

  feedWith(profile: Profile): void {
    this.#profile = profile;
  }

  getProfile(): Observable<Profile> {
    return this.result(() => this.#profile);
  }
}

@Injectable()
export class InMemoryShowsGateway extends FailableGateway implements ShowsGateway {
  #watchNext: WatchNextItem[] = [];
  #recentlyWatched: RecentlyWatchedItem[] = [];
  #myShows: MyShowItem[] = [];
  #showProgress: ShowProgress = FAKE_SHOW_PROGRESS;
  #seasonEpisodes: EpisodeWithState[] = [];

  feedWith(data: Partial<{
    watchNext: WatchNextItem[];
    recentlyWatched: RecentlyWatchedItem[];
    myShows: MyShowItem[];
    showProgress: ShowProgress;
    seasonEpisodes: EpisodeWithState[];
  }>): void {
    this.#watchNext = data.watchNext ?? this.#watchNext;
    this.#recentlyWatched = data.recentlyWatched ?? this.#recentlyWatched;
    this.#myShows = data.myShows ?? this.#myShows;
    this.#showProgress = data.showProgress ?? this.#showProgress;
    this.#seasonEpisodes = data.seasonEpisodes ?? this.#seasonEpisodes;
  }

  getWatchNext(): Observable<WatchNextItem[]> {
    return this.result(() => this.#watchNext);
  }

  getRecentlyWatched(): Observable<RecentlyWatchedItem[]> {
    return this.result(() => this.#recentlyWatched);
  }

  getMyShows(): Observable<MyShowItem[]> {
    return this.result(() => this.#myShows);
  }

  getShowProgress(): Observable<ShowProgress> {
    return this.result(() => this.#showProgress);
  }

  getSeasonEpisodes(): Observable<EpisodeWithState[]> {
    return this.result(() => this.#seasonEpisodes);
  }

  follow(): Observable<FollowedShow> {
    return this.result(() => FAKE_FOLLOWED_SHOW);
  }

  unfollow(): Observable<void> {
    return this.result(() => undefined);
  }

  updateStatus(): Observable<void> {
    return this.result(() => undefined);
  }

  markEpisodeWatched(): Observable<void> {
    return this.result(() => undefined);
  }

  unmarkEpisodeWatched(): Observable<void> {
    return this.result(() => undefined);
  }

  markSeasonWatched(): Observable<{ marked: number }> {
    return this.result(() => ({ marked: 0 }));
  }
}

@Injectable()
export class InMemoryMoviesGateway extends FailableGateway implements MoviesGateway {
  #movies: TrackedMovie[] = [];

  feedWith(movies: TrackedMovie[]): void {
    this.#movies = movies;
  }

  getMyMovies(): Observable<TrackedMovie[]> {
    return this.result(() => this.#movies);
  }

  track(): Observable<TrackedMovie> {
    return this.result(() => FAKE_TRACKED_MOVIE);
  }

  setWatched(): Observable<void> {
    return this.result(() => undefined);
  }

  untrack(): Observable<void> {
    return this.result(() => undefined);
  }
}

@Injectable()
export class InMemoryCatalogGateway extends FailableGateway implements CatalogGateway {
  #results: CatalogSearchResult[] = [];

  feedWith(results: CatalogSearchResult[]): void {
    this.#results = results;
  }

  search(): Observable<CatalogSearchResult[]> {
    return this.result(() => this.#results);
  }
}

@Injectable()
export class InMemoryStatsGateway extends FailableGateway implements StatsGateway {
  #stats: ProfileStatsFull = FAKE_STATS;

  feedWith(stats: ProfileStatsFull): void {
    this.#stats = stats;
  }

  getStats(): Observable<ProfileStatsFull> {
    return this.result(() => this.#stats);
  }
}

@Injectable()
export class InMemoryNotificationGateway extends NotificationGateway {
  readonly errors: string[] = [];

  override error(detail: string): void {
    this.errors.push(detail);
  }
}

@Injectable()
export class InMemoryTokenStorageGateway extends TokenStorageGateway {
  #token: string | null = null;

  override read(): string | null {
    return this.#token;
  }

  override save(token: string): void {
    this.#token = token;
  }

  override clear(): void {
    this.#token = null;
  }
}
