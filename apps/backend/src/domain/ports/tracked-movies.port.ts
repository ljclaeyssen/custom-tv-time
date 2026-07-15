import { TrackedMovie, TrackedMovieInput } from '../models/tracked-movie.model';

export abstract class TrackedMoviesPort {
  abstract findAllByUser(userId: string): Promise<TrackedMovie[]>;
  abstract findOne(userId: string, tmdbMovieId: number): Promise<TrackedMovie | null>;
  abstract upsert(movie: TrackedMovieInput): Promise<TrackedMovie>;
  abstract setWatched(userId: string, tmdbMovieId: number, watchedAt: string | null): Promise<void>;
  abstract remove(userId: string, tmdbMovieId: number): Promise<void>;
}
