import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MoviesGateway } from '../domain/gateways/movies.gateway';
import { MovieProgress, TrackedMovie } from '../domain/models/movie.model';

@Injectable()
export class RestMoviesGateway extends MoviesGateway {
  readonly #http = inject(HttpClient);
  readonly #baseUrl = '/api/movies';

  getMyMovies(): Observable<TrackedMovie[]> {
    return this.#http.get<TrackedMovie[]>(this.#baseUrl);
  }

  getMovieProgress(tmdbMovieId: number): Observable<MovieProgress> {
    return this.#http.get<MovieProgress>(`${this.#baseUrl}/${tmdbMovieId}`);
  }

  track(tmdbMovieId: number, watched: boolean): Observable<TrackedMovie> {
    return this.#http.post<TrackedMovie>(`${this.#baseUrl}/${tmdbMovieId}`, { watched });
  }

  setWatched(tmdbMovieId: number, watched: boolean): Observable<void> {
    return this.#http.patch<void>(`${this.#baseUrl}/${tmdbMovieId}/watched`, { watched });
  }

  untrack(tmdbMovieId: number): Observable<void> {
    return this.#http.delete<void>(`${this.#baseUrl}/${tmdbMovieId}`);
  }
}
