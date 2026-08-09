import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

/** Payload utilisateur posé sur la requête par le guard JWT. */
export interface AuthenticatedUser {
  userId: string;
  username: string;
}

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const header = request.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Jeton manquant');
    }
    try {
      const payload = await this.jwtService.verifyAsync<{ sub?: string; username?: string }>(
        header.slice('Bearer '.length),
      );
      // Seuls les jetons de session portent un sub : un state OAuth signé
      // avec le même secret ne doit pas passer le guard.
      if (!payload.sub || !payload.username) {
        throw new Error('payload de session incomplet');
      }
      request.user = { userId: payload.sub, username: payload.username };
      return true;
    } catch {
      throw new UnauthorizedException('Jeton invalide ou expiré');
    }
  }
}
