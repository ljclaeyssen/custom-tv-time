import { Observable } from 'rxjs';
import {
  EpisodeWithState,
  FollowedShow,
  FollowStatus,
  MyShowItem,
  ShowProgress,
  WatchNextItem,
} from '../models/show.model';

export abstract class ShowsGateway {
  abstract getWatchNext(): Observable<WatchNextItem[]>;
  abstract getMyShows(): Observable<MyShowItem[]>;
  abstract getShowProgress(tmdbShowId: number): Observable<ShowProgress>;
  abstract getSeasonEpisodes(tmdbShowId: number, seasonNumber: number): Observable<EpisodeWithState[]>;
  abstract follow(tmdbShowId: number): Observable<FollowedShow>;
  abstract unfollow(tmdbShowId: number): Observable<void>;
  abstract updateStatus(tmdbShowId: number, status: FollowStatus): Observable<void>;
  abstract markEpisodeWatched(tmdbShowId: number, season: number, episode: number): Observable<void>;
  abstract unmarkEpisodeWatched(tmdbShowId: number, season: number, episode: number): Observable<void>;
  abstract markSeasonWatched(tmdbShowId: number, seasonNumber: number): Observable<{ marked: number }>;
}
