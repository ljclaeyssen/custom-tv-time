import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: { userId: string; username: string };
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
      const payload = await this.jwtService.verifyAsync<{ sub: string; username: string }>(
        header.slice('Bearer '.length),
      );
      request.user = { userId: payload.sub, username: payload.username };
      return true;
    } catch {
      throw new UnauthorizedException('Jeton invalide ou expiré');
    }
  }
}
