import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DiscordProfile } from '../../domain/models/user.model';
import { DiscordAuthPort } from '../../domain/ports/discord-auth.port';
import { AuthenticationFailedError } from '../../domain/exceptions/domain.errors';

const DISCORD_API = 'https://discord.com/api/v10';

@Injectable()
export class DiscordAuthAdapter extends DiscordAuthPort {
  readonly #clientId: string;
  readonly #clientSecret: string;
  readonly #callbackUrl: string;

  constructor(config: ConfigService) {
    super();
    this.#clientId = config.get<string>('DISCORD_CLIENT_ID', '');
    this.#clientSecret = config.get<string>('DISCORD_CLIENT_SECRET', '');
    this.#callbackUrl = config.get<string>('DISCORD_CALLBACK_URL', '');
  }

  getAuthorizationUrl(state: string): string {
    const url = new URL('https://discord.com/oauth2/authorize');
    url.searchParams.set('client_id', this.#clientId);
    url.searchParams.set('redirect_uri', this.#callbackUrl);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('scope', 'identify');
    url.searchParams.set('state', state);
    return url.toString();
  }

  async exchangeCode(code: string): Promise<DiscordProfile> {
    const tokenResponse = await fetch(`${DISCORD_API}/oauth2/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: this.#clientId,
        client_secret: this.#clientSecret,
        grant_type: 'authorization_code',
        code,
        redirect_uri: this.#callbackUrl,
      }),
    });
    if (!tokenResponse.ok) {
      throw new AuthenticationFailedError(`échange du code Discord (${tokenResponse.status})`);
    }
    const token = (await tokenResponse.json()) as { access_token: string };

    const userResponse = await fetch(`${DISCORD_API}/users/@me`, {
      headers: { Authorization: `Bearer ${token.access_token}` },
    });
    if (!userResponse.ok) {
      throw new AuthenticationFailedError(`récupération du profil Discord (${userResponse.status})`);
    }
    const user = (await userResponse.json()) as {
      id: string;
      username: string;
      global_name: string | null;
      avatar: string | null;
    };

    return {
      discordId: user.id,
      username: user.global_name ?? user.username,
      avatarUrl: user.avatar
        ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
        : null,
    };
  }
}
