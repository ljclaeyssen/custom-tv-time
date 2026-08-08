import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, first, tap } from 'rxjs';
import { ProfileGateway } from '../domain/gateways/profile.gateway';
import { AuthStore } from '../store/auth.store';

@Injectable()
export class RetrieveProfile {
  readonly #gateway = inject(ProfileGateway);
  readonly #store = inject(AuthStore);

  execute(): void {
    this.#gateway
      .getProfile()
      .pipe(
        first(),
        tap((profile) => this.#store.setProfile(profile)),
        catchError(() => EMPTY),
      )
      .subscribe();
  }
}
