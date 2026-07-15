import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FollowedShow, FollowStatus } from '../../domain/models/followed-show.model';
import { FollowsPort } from '../../domain/ports/follows.port';
import { FollowedShowEntity } from './entities/followed-show.entity';

@Injectable()
export class FollowsPersistenceAdapter extends FollowsPort {
  constructor(
    @InjectRepository(FollowedShowEntity)
    private readonly repository: Repository<FollowedShowEntity>,
  ) {
    super();
  }

  async findAllByUser(userId: string): Promise<FollowedShow[]> {
    const entities = await this.repository.find({ where: { userId }, order: { followedAt: 'DESC' } });
    return entities.map((e) => this.toDomain(e));
  }

  async findOne(userId: string, tmdbShowId: number): Promise<FollowedShow | null> {
    const entity = await this.repository.findOneBy({ userId, tmdbShowId });
    return entity ? this.toDomain(entity) : null;
  }

  async add(follow: Omit<FollowedShow, 'id'>): Promise<FollowedShow> {
    const entity = this.repository.create({
      ...follow,
      followedAt: new Date(follow.followedAt),
    });
    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async updateStatus(userId: string, tmdbShowId: number, status: FollowStatus): Promise<void> {
    await this.repository.update({ userId, tmdbShowId }, { status });
  }

  async remove(userId: string, tmdbShowId: number): Promise<void> {
    await this.repository.delete({ userId, tmdbShowId });
  }

  private toDomain(entity: FollowedShowEntity): FollowedShow {
    return {
      id: entity.id,
      userId: entity.userId,
      tmdbShowId: entity.tmdbShowId,
      tvdbId: entity.tvdbId,
      name: entity.name,
      posterPath: entity.posterPath,
      status: entity.status as FollowStatus,
      followedAt: entity.followedAt.toISOString(),
    };
  }
}
