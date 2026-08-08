import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { MovieMeta, ShowMeta } from '../../domain/models/meta.model';
import { StatsMetaPort } from '../../domain/ports/stats-meta.port';
import { MovieMetaEntity } from './entities/movie-meta.entity';
import { ShowMetaEntity } from './entities/show-meta.entity';

@Injectable()
export class StatsMetaPersistenceAdapter extends StatsMetaPort {
  constructor(
    @InjectRepository(ShowMetaEntity)
    private readonly showRepo: Repository<ShowMetaEntity>,
    @InjectRepository(MovieMetaEntity)
    private readonly movieRepo: Repository<MovieMetaEntity>,
  ) {
    super();
  }

  async getShowMeta(tmdbShowIds: number[]): Promise<Map<number, ShowMeta>> {
    if (tmdbShowIds.length === 0) {
      return new Map();
    }
    const rows = await this.showRepo.findBy({ tmdbShowId: In(tmdbShowIds) });
    return new Map(
      rows.map((r) => [r.tmdbShowId, { tmdbShowId: r.tmdbShowId, genres: r.genres ?? [], episodeRuntime: r.episodeRuntime }]),
    );
  }

  async saveShowMeta(meta: ShowMeta[]): Promise<void> {
    if (meta.length === 0) {
      return;
    }
    await this.showRepo.upsert(meta, ['tmdbShowId']);
  }

  async getMovieMeta(tmdbMovieIds: number[]): Promise<Map<number, MovieMeta>> {
    if (tmdbMovieIds.length === 0) {
      return new Map();
    }
    const rows = await this.movieRepo.findBy({ tmdbMovieId: In(tmdbMovieIds) });
    return new Map(rows.map((r) => [r.tmdbMovieId, { tmdbMovieId: r.tmdbMovieId, runtime: r.runtime }]));
  }

  async saveMovieMeta(meta: MovieMeta[]): Promise<void> {
    if (meta.length === 0) {
      return;
    }
    await this.movieRepo.upsert(meta, ['tmdbMovieId']);
  }
}
