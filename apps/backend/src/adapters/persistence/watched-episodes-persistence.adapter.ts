import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { WatchedEpisode, WatchedEpisodeInput, WatchSource } from '../../domain/models/watched-episode.model';
import { WatchedEpisodesPort } from '../../domain/ports/watched-episodes.port';
import { WatchedEpisodeEntity } from './entities/watched-episode.entity';

@Injectable()
export class WatchedEpisodesPersistenceAdapter extends WatchedEpisodesPort {
  constructor(
    @InjectRepository(WatchedEpisodeEntity)
    private readonly repository: Repository<WatchedEpisodeEntity>,
  ) {
    super();
  }

  async findAllByUser(userId: string): Promise<WatchedEpisode[]> {
    const entities = await this.repository.find({ where: { userId } });
    return entities.map((e) => this.toDomain(e));
  }

  async findByUserAndShow(userId: string, tmdbShowId: number): Promise<WatchedEpisode[]> {
    const entities = await this.repository.find({
      where: { userId, tmdbShowId },
      order: { season: 'ASC', episode: 'ASC' },
    });
    return entities.map((e) => this.toDomain(e));
  }

  async addMany(episodes: WatchedEpisodeInput[]): Promise<number> {
    if (episodes.length === 0) {
      return 0;
    }
    let inserted = 0;
    const batchSize = 500;
    for (let i = 0; i < episodes.length; i += batchSize) {
      const batch = episodes.slice(i, i + batchSize).map((e) => ({
        userId: e.userId,
        tmdbShowId: e.tmdbShowId,
        season: e.season,
        episode: e.episode,
        watchedAt: e.watchedAt ? new Date(e.watchedAt) : null,
        source: e.source,
      }));
      const result = await this.repository
        .createQueryBuilder()
        .insert()
        .values(batch)
        .orIgnore()
        .execute();
      inserted += result.identifiers.filter(Boolean).length;
    }
    return inserted;
  }

  async remove(userId: string, tmdbShowId: number, season: number, episode: number): Promise<void> {
    await this.repository.delete({ userId, tmdbShowId, season, episode });
  }

  async removeAllForShow(userId: string, tmdbShowId: number): Promise<void> {
    await this.repository.delete({ userId, tmdbShowId });
  }

  async removeAllExcept(
    userId: string,
    tmdbShowId: number,
    keep: { season: number; episode: number }[],
  ): Promise<number> {
    const keepKeys = new Set(keep.map((k) => `${k.season}:${k.episode}`));
    const rows = await this.repository.find({ where: { userId, tmdbShowId } });
    const toDelete = rows.filter((r) => !keepKeys.has(`${r.season}:${r.episode}`));
    if (toDelete.length > 0) {
      await this.repository.delete(toDelete.map((r) => r.id));
    }
    return toDelete.length;
  }

  async removeImportedForShows(userId: string, tmdbShowIds: number[]): Promise<number> {
    if (tmdbShowIds.length === 0) {
      return 0;
    }
    const result = await this.repository.delete({
      userId,
      source: 'import',
      tmdbShowId: In(tmdbShowIds),
    });
    return result.affected ?? 0;
  }

  async countByUser(userId: string): Promise<number> {
    return this.repository.countBy({ userId });
  }

  private toDomain(entity: WatchedEpisodeEntity): WatchedEpisode {
    return {
      id: entity.id,
      userId: entity.userId,
      tmdbShowId: entity.tmdbShowId,
      season: entity.season,
      episode: entity.episode,
      watchedAt: entity.watchedAt ? entity.watchedAt.toISOString() : null,
      source: entity.source as WatchSource,
    };
  }
}
