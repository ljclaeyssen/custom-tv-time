import { Injectable } from '@nestjs/common';
import { TrackedMovie } from '../domain/models/tracked-movie.model';
import { TrackedMoviesPort } from '../domain/ports/tracked-movies.port';

@Injectable()
export class RetrieveMyMoviesUseCase {
  constructor(private readonly trackedMovies: TrackedMoviesPort) {}

  async execute(userId: string): Promise<TrackedMovie[]> {
    return this.trackedMovies.findAllByUser(userId);
  }
}
