import { Injectable } from '@angular/core';
import { TokenStorageGateway } from '../domain/gateways/token-storage.gateway';

const TOKEN_KEY = 'ctt.token';

@Injectable()
export class LocalStorageTokenGateway extends TokenStorageGateway {
  read(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  save(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  clear(): void {
    localStorage.removeItem(TOKEN_KEY);
  }
}
