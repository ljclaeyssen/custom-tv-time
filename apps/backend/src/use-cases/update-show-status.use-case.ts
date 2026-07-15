import { Injectable } from '@nestjs/common';
import { FollowStatus } from '../domain/models/followed-show.model';
import { FollowsPort } from '../domain/ports/follows.port';
import { EntityNotFoundError } from '../domain/exceptions/domain.errors';

@Injectable()
export class UpdateShowStatusUseCase {
  constructor(private readonly follows: FollowsPort) {}

  async execute(userId: string, tmdbShowId: number, status: FollowStatus): Promise<void> {
    const follow = await this.follows.findOne(userId, tmdbShowId);
    if (!follow) {
      throw new EntityNotFoundError('Série suivie', tmdbShowId);
    }
    await this.follows.updateStatus(userId, tmdbShowId, status);
  }
}
