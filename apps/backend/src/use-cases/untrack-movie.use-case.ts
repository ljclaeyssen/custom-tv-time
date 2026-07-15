import { Injectable } from '@nestjs/common';
import { TrackedMoviesPort } from '../domain/ports/tracked-movies.port';

@Injectable()
export class UntrackMovieUseCase {
  constructor(private readonly trackedMovies: TrackedMoviesPort) {}

  async execute(userId: string, tmdbMovieId: number): Promise<void> {
    await this.trackedMovies.remove(userId, tmdbMovieId);
  }
}
