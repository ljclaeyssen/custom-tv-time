import { inject, Injectable } from '@angular/core';
import { ProfileGateway } from '../domain/gateways/profile.gateway';
import { AuthStore } from '../store/auth.store';
import { runQuery } from './run-query';

@Injectable()
export class RetrieveProfile {
  readonly #gateway = inject(ProfileGateway);
  readonly #store = inject(AuthStore);

  execute(): void {
    runQuery(this.#gateway.getProfile(), {
      onResult: (profile) => this.#store.setProfile(profile),
    });
  }
}
