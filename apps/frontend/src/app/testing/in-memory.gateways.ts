import { Injectable } from '@angular/core';
import { ProfileStatsFull } from '@ctt/shared-models';
import { Observable, of } from 'rxjs';
import { CatalogGateway } from '../domain/gateways/catalog.gateway';
import { MoviesGateway } from '../domain/gateways/movies.gateway';
import { ProfileGateway } from '../domain/gateways/profile.gateway';
import { ShowsGateway } from '../domain/gateways/shows.gateway';
import { StatsGateway } from '../domain/gateways/stats.gateway';
import { CatalogSearchResult } from '../domain/models/catalog.model';
import { TrackedMovie } from '../domain/models/movie.model';
import {
  EpisodeWithState,
  FollowedShow,
  FollowStatus,
  MyShowItem,
  RecentlyWatchedItem,
  ShowProgress,
  WatchNextItem,
} from '../domain/models/show.model';
import { ImportReport, Profile } from '../domain/models/user.model';

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

@Injectable()
export class InMemoryProfileGateway extends ProfileGateway {
  override getProfile(): Observable<Profile> {
    return of(FAKE_PROFILE);
  }

  override importTvtime(): Observable<ImportReport> {
    return of({
      seriesImported: 0,
      seriesSkipped: 0,
      moviesImported: 0,
      moviesSkipped: 0,
      episodesImported: 0,
      warnings: [],
    });
  }
}

@Injectable()
export class InMemoryShowsGateway extends ShowsGateway {
  override getWatchNext(): Observable<WatchNextItem[]> {
    return of([]);
  }

  override getRecentlyWatched(): Observable<RecentlyWatchedItem[]> {
    return of([]);
  }

  override getMyShows(): Observable<MyShowItem[]> {
    return of([]);
  }

  override getShowProgress(): Observable<ShowProgress> {
    return of(FAKE_SHOW_PROGRESS);
  }

  override getSeasonEpisodes(): Observable<EpisodeWithState[]> {
    return of([]);
  }

  override follow(): Observable<FollowedShow> {
    return of(FAKE_FOLLOWED_SHOW);
  }

  override unfollow(): Observable<void> {
    return of(undefined);
  }

  override updateStatus(): Observable<void> {
    return of(undefined);
  }

  override markEpisodeWatched(): Observable<void> {
    return of(undefined);
  }

  override unmarkEpisodeWatched(): Observable<void> {
    return of(undefined);
  }

  override markSeasonWatched(): Observable<{ marked: number }> {
    return of({ marked: 0 });
  }
}

@Injectable()
export class InMemoryMoviesGateway extends MoviesGateway {
  override getMyMovies(): Observable<TrackedMovie[]> {
    return of([]);
  }

  override track(): Observable<TrackedMovie> {
    return of(FAKE_TRACKED_MOVIE);
  }

  override setWatched(): Observable<void> {
    return of(undefined);
  }

  override untrack(): Observable<void> {
    return of(undefined);
  }
}

@Injectable()
export class InMemoryCatalogGateway extends CatalogGateway {
  override search(): Observable<CatalogSearchResult[]> {
    return of([]);
  }
}

@Injectable()
export class InMemoryStatsGateway extends StatsGateway {
  override getStats(): Observable<ProfileStatsFull> {
    return of(FAKE_STATS);
  }
}
