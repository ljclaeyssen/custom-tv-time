import { inject, Injectable } from '@angular/core';
import { TokenStorageGateway } from '../domain/gateways/token-storage.gateway';
import { AuthStore } from '../store/auth.store';
import { RetrieveProfile } from './retrieve-profile';

@Injectable()
export class CompleteDiscordLogin {
  readonly #tokenStorage = inject(TokenStorageGateway);
  readonly #store = inject(AuthStore);
  readonly #retrieveProfile = inject(RetrieveProfile);

  execute(urlFragment: string): boolean {
    const token = new URLSearchParams(urlFragment.replace(/^#/, '')).get('token');
    if (!token) {
      return false;
    }
    this.#tokenStorage.save(token);
    this.#store.setToken(token);
    this.#retrieveProfile.execute();
    return true;
  }
}
