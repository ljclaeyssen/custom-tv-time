import { Injectable } from '@nestjs/common';
import { TrackedMoviesPort } from '../domain/ports/tracked-movies.port';
import { EntityNotFoundError } from '../domain/exceptions/domain.errors';

@Injectable()
export class SetMovieWatchedUseCase {
  constructor(private readonly trackedMovies: TrackedMoviesPort) {}

  async execute(userId: string, tmdbMovieId: number, watched: boolean): Promise<void> {
    const movie = await this.trackedMovies.findOne(userId, tmdbMovieId);
    if (!movie) {
      throw new EntityNotFoundError('Film suivi', tmdbMovieId);
    }
    await this.trackedMovies.setWatched(
      userId,
      tmdbMovieId,
      watched ? new Date().toISOString() : null,
    );
  }
}
