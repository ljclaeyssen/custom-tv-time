import { Injectable } from '@nestjs/common';
import { FollowsPort } from '../domain/ports/follows.port';

@Injectable()
export class UnfollowShowUseCase {
  constructor(private readonly follows: FollowsPort) {}

  async execute(userId: string, tmdbShowId: number): Promise<void> {
    await this.follows.remove(userId, tmdbShowId);
  }
}
