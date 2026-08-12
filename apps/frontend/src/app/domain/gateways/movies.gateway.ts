import { Observable } from 'rxjs';
import { MovieProgress, TrackedMovie } from '../models/movie.model';

export abstract class MoviesGateway {
  abstract getMyMovies(): Observable<TrackedMovie[]>;
  abstract getMovieProgress(tmdbMovieId: number): Observable<MovieProgress>;
  abstract track(tmdbMovieId: number, watched: boolean): Observable<TrackedMovie>;
  abstract setWatched(tmdbMovieId: number, watched: boolean): Observable<void>;
  abstract untrack(tmdbMovieId: number): Observable<void>;
}
