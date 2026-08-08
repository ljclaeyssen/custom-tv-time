import { Injectable } from '@nestjs/common';
import { AuthenticationFailedError } from '../domain/exceptions/domain.errors';
import { AuthTokensPort } from '../domain/ports/auth-tokens.port';
import { DiscordAuthPort } from '../domain/ports/discord-auth.port';
import { UsersPort } from '../domain/ports/users.port';

@Injectable()
export class AuthenticateWithDiscordUseCase {
  constructor(
    private readonly discordAuth: DiscordAuthPort,
    private readonly users: UsersPort,
    private readonly tokens: AuthTokensPort,
  ) {}

  /** Vérifie le state CSRF, échange le code OAuth, et émet le jeton de session. */
  async execute(code: string, state: string): Promise<string> {
    if (!(await this.tokens.verifyOauthState(state))) {
      throw new AuthenticationFailedError('state OAuth invalide');
    }
    const profile = await this.discordAuth.exchangeCode(code);
    const user = await this.users.upsertFromDiscord(profile);
    return this.tokens.signSession(user);
  }
}
