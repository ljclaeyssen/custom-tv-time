import { Injectable } from '@nestjs/common';
import { AuthTokensPort } from '../domain/ports/auth-tokens.port';
import { DiscordAuthPort } from '../domain/ports/discord-auth.port';

@Injectable()
export class StartDiscordLoginUseCase {
  constructor(
    private readonly discordAuth: DiscordAuthPort,
    private readonly tokens: AuthTokensPort,
  ) {}

  /** Prépare le state CSRF et retourne l'URL d'autorisation Discord. */
  async execute(): Promise<string> {
    const state = await this.tokens.signOauthState();
    return this.discordAuth.getAuthorizationUrl(state);
  }
}
