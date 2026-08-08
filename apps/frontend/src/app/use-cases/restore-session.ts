import { inject, Injectable } from '@angular/core';
import { TokenStorageGateway } from '../domain/gateways/token-storage.gateway';
import { AuthStore } from '../store/auth.store';

/** Réhydrate la session persistée au démarrage de l'application. */
@Injectable()
export class RestoreSession {
  readonly #tokenStorage = inject(TokenStorageGateway);
  readonly #store = inject(AuthStore);

  execute(): void {
    const token = this.#tokenStorage.read();
    if (token) {
      this.#store.setToken(token);
    }
  }
}
