import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiscordProfile, User } from '../../domain/models/user.model';
import { UsersPort } from '../../domain/ports/users.port';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersPersistenceAdapter extends UsersPort {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {
    super();
  }

  async findById(id: string): Promise<User | null> {
    const entity = await this.repository.findOneBy({ id });
    return entity ? this.toDomain(entity) : null;
  }

  async findByDiscordId(discordId: string): Promise<User | null> {
    const entity = await this.repository.findOneBy({ discordId });
    return entity ? this.toDomain(entity) : null;
  }

  async upsertFromDiscord(profile: DiscordProfile): Promise<User> {
    let entity = await this.repository.findOneBy({ discordId: profile.discordId });
    if (entity) {
      entity.username = profile.username;
      entity.avatarUrl = profile.avatarUrl;
    } else {
      entity = this.repository.create({
        discordId: profile.discordId,
        username: profile.username,
        avatarUrl: profile.avatarUrl,
      });
    }
    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  private toDomain(entity: UserEntity): User {
    return {
      id: entity.id,
      discordId: entity.discordId,
      username: entity.username,
      avatarUrl: entity.avatarUrl,
      createdAt: entity.createdAt.toISOString(),
    };
  }
}
