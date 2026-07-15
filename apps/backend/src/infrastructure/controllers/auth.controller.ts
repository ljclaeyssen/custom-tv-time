import { Controller, Get, Query, Res, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { Response } from 'express';
import { DiscordAuthPort } from '../../domain/ports/discord-auth.port';
import { AuthenticateWithDiscordUseCase } from '../../use-cases/authenticate-with-discord.use-case';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authenticateWithDiscord: AuthenticateWithDiscordUseCase,
    private readonly discordAuth: DiscordAuthPort,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  @Get('discord')
  async redirectToDiscord(@Res() response: Response): Promise<void> {
    const state = await this.jwtService.signAsync({ purpose: 'oauth-state' }, { expiresIn: '10m' });
    response.redirect(this.discordAuth.getAuthorizationUrl(state));
  }

  @Get('discord/callback')
  async callback(
    @Query('code') code: string,
    @Query('state') state: string,
    @Res() response: Response,
  ): Promise<void> {
    if (!code || !state) {
      throw new UnauthorizedException('Code ou state manquant');
    }
    try {
      await this.jwtService.verifyAsync(state);
    } catch {
      throw new UnauthorizedException('State invalide');
    }
    const user = await this.authenticateWithDiscord.execute(code);
    const token = await this.jwtService.signAsync({ sub: user.id, username: user.username });
    const frontendUrl = this.config.get<string>('FRONTEND_URL', 'http://localhost:4200');
    // Le token passe en fragment d'URL : il n'atteint jamais les logs serveur.
    response.redirect(`${frontendUrl}/auth/callback#token=${token}`);
  }
}
