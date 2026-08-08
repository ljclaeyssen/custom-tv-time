import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShowsGateway } from '../domain/gateways/shows.gateway';
import {
  EpisodeWithState,
  FollowedShow,
  FollowStatus,
  MyShowItem,
  RecentlyWatchedItem,
  ShowProgress,
  WatchNextItem,
} from '../domain/models/show.model';

@Injectable()
export class RestShowsGateway extends ShowsGateway {
  readonly #http = inject(HttpClient);
  readonly #baseUrl = '/api/shows';

  getWatchNext(): Observable<WatchNextItem[]> {
    return this.#http.get<WatchNextItem[]>(`${this.#baseUrl}/watch-next`);
  }

  getRecentlyWatched(): Observable<RecentlyWatchedItem[]> {
    return this.#http.get<RecentlyWatchedItem[]>(`${this.#baseUrl}/recently-watched`);
  }

  getMyShows(): Observable<MyShowItem[]> {
    return this.#http.get<MyShowItem[]>(this.#baseUrl);
  }

  getShowProgress(tmdbShowId: number): Observable<ShowProgress> {
    return this.#http.get<ShowProgress>(`${this.#baseUrl}/${tmdbShowId}`);
  }

  getSeasonEpisodes(tmdbShowId: number, seasonNumber: number): Observable<EpisodeWithState[]> {
    return this.#http.get<EpisodeWithState[]>(`${this.#baseUrl}/${tmdbShowId}/season/${seasonNumber}`);
  }

  follow(tmdbShowId: number): Observable<FollowedShow> {
    return this.#http.post<FollowedShow>(`${this.#baseUrl}/${tmdbShowId}/follow`, {});
  }

  unfollow(tmdbShowId: number): Observable<void> {
    return this.#http.delete<void>(`${this.#baseUrl}/${tmdbShowId}/follow`);
  }

  updateStatus(tmdbShowId: number, status: FollowStatus): Observable<void> {
    return this.#http.patch<void>(`${this.#baseUrl}/${tmdbShowId}/status`, { status });
  }

  markEpisodeWatched(tmdbShowId: number, season: number, episode: number): Observable<void> {
    return this.#http.post<void>(
      `${this.#baseUrl}/${tmdbShowId}/episodes/${season}/${episode}/watch`,
      {},
    );
  }

  unmarkEpisodeWatched(tmdbShowId: number, season: number, episode: number): Observable<void> {
    return this.#http.delete<void>(
      `${this.#baseUrl}/${tmdbShowId}/episodes/${season}/${episode}/watch`,
    );
  }

  markSeasonWatched(tmdbShowId: number, seasonNumber: number): Observable<{ marked: number }> {
    return this.#http.post<{ marked: number }>(
      `${this.#baseUrl}/${tmdbShowId}/season/${seasonNumber}/watch`,
      {},
    );
  }
}
