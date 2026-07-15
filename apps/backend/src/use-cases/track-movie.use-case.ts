import { Injectable } from '@nestjs/common';
import { TrackedMovie } from '../domain/models/tracked-movie.model';
import { CatalogPort } from '../domain/ports/catalog.port';
import { TrackedMoviesPort } from '../domain/ports/tracked-movies.port';

@Injectable()
export class TrackMovieUseCase {
  constructor(
    private readonly trackedMovies: TrackedMoviesPort,
    private readonly catalog: CatalogPort,
  ) {}

  async execute(userId: string, tmdbMovieId: number, watched: boolean): Promise<TrackedMovie> {
    const detail = await this.catalog.getMovieDetail(tmdbMovieId);
    return this.trackedMovies.upsert({
      userId,
      tmdbMovieId,
      imdbId: detail.imdbId,
      title: detail.title,
      posterPath: detail.posterPath,
      releaseDate: detail.releaseDate,
      watchedAt: watched ? new Date().toISOString() : null,
    });
  }
}
