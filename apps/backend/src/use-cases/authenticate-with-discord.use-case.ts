import { Injectable } from '@nestjs/common';
import { User } from '../domain/models/user.model';
import { DiscordAuthPort } from '../domain/ports/discord-auth.port';
import { UsersPort } from '../domain/ports/users.port';

@Injectable()
export class AuthenticateWithDiscordUseCase {
  constructor(
    private readonly discordAuth: DiscordAuthPort,
    private readonly users: UsersPort,
  ) {}

  async execute(code: string): Promise<User> {
    const profile = await this.discordAuth.exchangeCode(code);
    return this.users.upsertFromDiscord(profile);
  }
}
