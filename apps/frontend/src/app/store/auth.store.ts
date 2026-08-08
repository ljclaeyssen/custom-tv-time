import { computed, Injectable, signal } from '@angular/core';
import { Profile } from '../domain/models/user.model';

const TOKEN_KEY = 'ctt.token';

interface AuthState {
  token: string | null;
  profile: Profile | null;
}

@Injectable({ providedIn: 'root' })
export class AuthStore {
  readonly #state = signal<AuthState>({
    token: localStorage.getItem(TOKEN_KEY),
    profile: null,
  });

  readonly token = computed(() => this.#state().token);
  readonly profile = computed(() => this.#state().profile);
  readonly isAuthenticated = computed(() => this.#state().token !== null);

  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
    this.#state.update((s) => ({ ...s, token }));
  }

  setProfile(profile: Profile): void {
    this.#state.update((s) => ({ ...s, profile }));
  }

  clear(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.#state.set({ token: null, profile: null });
  }
}
