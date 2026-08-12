import { Injectable } from '@nestjs/common';
import { MovieProgress } from '../domain/models/tracked-movie.model';
import { CatalogPort } from '../domain/ports/catalog.port';
import { TrackedMoviesPort } from '../domain/ports/tracked-movies.port';

@Injectable()
export class RetrieveMovieProgressUseCase {
  constructor(
    private readonly catalog: CatalogPort,
    private readonly trackedMovies: TrackedMoviesPort,
  ) {}

  async execute(userId: string, tmdbMovieId: number): Promise<MovieProgress> {
    const [detail, tracked] = await Promise.all([
      this.catalog.getMovieDetail(tmdbMovieId),
      this.trackedMovies.findOne(userId, tmdbMovieId),
    ]);
    return { detail, tracked };
  }
}
