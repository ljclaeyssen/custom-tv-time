import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../domain/models/user.model';
import { AuthTokensPort } from '../../domain/ports/auth-tokens.port';

@Injectable()
export class JwtAuthTokensAdapter extends AuthTokensPort {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  signOauthState(): Promise<string> {
    return this.jwtService.signAsync({ purpose: 'oauth-state' }, { expiresIn: '10m' });
  }

  async verifyOauthState(state: string): Promise<boolean> {
    try {
      await this.jwtService.verifyAsync(state);
      return true;
    } catch {
      return false;
    }
  }

  signSession(user: User): Promise<string> {
    return this.jwtService.signAsync({ sub: user.id, username: user.username });
  }
}
