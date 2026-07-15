import { Injectable } from '@nestjs/common';
import { FollowedShow } from '../domain/models/followed-show.model';
import { CatalogPort } from '../domain/ports/catalog.port';
import { FollowsPort } from '../domain/ports/follows.port';
import { AlreadyFollowedError } from '../domain/exceptions/domain.errors';

@Injectable()
export class FollowShowUseCase {
  constructor(
    private readonly follows: FollowsPort,
    private readonly catalog: CatalogPort,
  ) {}

  async execute(userId: string, tmdbShowId: number): Promise<FollowedShow> {
    const existing = await this.follows.findOne(userId, tmdbShowId);
    if (existing) {
      throw new AlreadyFollowedError(existing.name);
    }
    const detail = await this.catalog.getShowDetail(tmdbShowId);
    return this.follows.add({
      userId,
      tmdbShowId,
      tvdbId: null,
      name: detail.name,
      posterPath: detail.posterPath,
      status: 'watching',
      followedAt: new Date().toISOString(),
    });
  }
}
