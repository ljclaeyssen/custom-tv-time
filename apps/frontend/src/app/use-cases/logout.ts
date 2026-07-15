import { inject, Injectable } from '@angular/core';
import { AuthStore } from '../store/auth.store';

@Injectable()
export class Logout {
  readonly #store = inject(AuthStore);

  execute(): void {
    this.#store.clear();
  }
}
