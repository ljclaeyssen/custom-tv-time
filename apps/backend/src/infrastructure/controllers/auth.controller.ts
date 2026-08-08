import { Controller, Get, Query, Res, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';
import { AuthenticateWithDiscordUseCase } from '../../use-cases/authenticate-with-discord.use-case';
import { StartDiscordLoginUseCase } from '../../use-cases/start-discord-login.use-case';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly startDiscordLogin: StartDiscordLoginUseCase,
    private readonly authenticateWithDiscord: AuthenticateWithDiscordUseCase,
    private readonly config: ConfigService,
  ) {}

  @Get('discord')
  async redirectToDiscord(@Res() response: Response): Promise<void> {
    response.redirect(await this.startDiscordLogin.execute());
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
    const token = await this.authenticateWithDiscord.execute(code, state);
    const frontendUrl = this.config.get<string>('FRONTEND_URL', 'http://localhost:4200');
    // Le token passe en fragment d'URL : il n'atteint jamais les logs serveur.
    response.redirect(`${frontendUrl}/auth/callback#token=${token}`);
  }
}
