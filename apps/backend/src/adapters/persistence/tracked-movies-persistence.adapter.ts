import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackedMovie, TrackedMovieInput } from '../../domain/models/tracked-movie.model';
import { TrackedMoviesPort } from '../../domain/ports/tracked-movies.port';
import { TrackedMovieEntity } from './entities/tracked-movie.entity';

@Injectable()
export class TrackedMoviesPersistenceAdapter extends TrackedMoviesPort {
  constructor(
    @InjectRepository(TrackedMovieEntity)
    private readonly repository: Repository<TrackedMovieEntity>,
  ) {
    super();
  }

  async findAllByUser(userId: string): Promise<TrackedMovie[]> {
    const entities = await this.repository.find({ where: { userId }, order: { addedAt: 'DESC' } });
    return entities.map((e) => this.toDomain(e));
  }

  async findOne(userId: string, tmdbMovieId: number): Promise<TrackedMovie | null> {
    const entity = await this.repository.findOneBy({ userId, tmdbMovieId });
    return entity ? this.toDomain(entity) : null;
  }

  async upsert(movie: TrackedMovieInput): Promise<TrackedMovie> {
    let entity = await this.repository.findOneBy({
      userId: movie.userId,
      tmdbMovieId: movie.tmdbMovieId,
    });
    if (entity) {
      entity.watchedAt = movie.watchedAt ? new Date(movie.watchedAt) : entity.watchedAt;
    } else {
      entity = this.repository.create({
        userId: movie.userId,
        tmdbMovieId: movie.tmdbMovieId,
        imdbId: movie.imdbId,
        title: movie.title,
        posterPath: movie.posterPath,
        releaseDate: movie.releaseDate,
        watchedAt: movie.watchedAt ? new Date(movie.watchedAt) : null,
      });
    }
    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async setWatched(userId: string, tmdbMovieId: number, watchedAt: string | null): Promise<void> {
    await this.repository.update(
      { userId, tmdbMovieId },
      { watchedAt: watchedAt ? new Date(watchedAt) : null },
    );
  }

  async remove(userId: string, tmdbMovieId: number): Promise<void> {
    await this.repository.delete({ userId, tmdbMovieId });
  }

  private toDomain(entity: TrackedMovieEntity): TrackedMovie {
    return {
      id: entity.id,
      userId: entity.userId,
      tmdbMovieId: entity.tmdbMovieId,
      imdbId: entity.imdbId,
      title: entity.title,
      posterPath: entity.posterPath,
      releaseDate: entity.releaseDate,
      watchedAt: entity.watchedAt ? entity.watchedAt.toISOString() : null,
      addedAt: entity.addedAt.toISOString(),
    };
  }
}
