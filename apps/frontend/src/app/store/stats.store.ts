import { computed, Injectable, signal } from '@angular/core';
import { ProfileStatsFull } from '@ctt/shared-models';

interface StatsState {
  stats: ProfileStatsFull | null;
  loading: boolean;
  error: string | null;
}

@Injectable({ providedIn: 'root' })
export class StatsStore {
  readonly #state = signal<StatsState>({ stats: null, loading: false, error: null });

  readonly stats = computed(() => this.#state().stats);
  readonly loading = computed(() => this.#state().loading);
  readonly error = computed(() => this.#state().error);

  setLoading(loading: boolean): void {
    this.#state.update((s) => ({ ...s, loading }));
  }

  setStats(stats: ProfileStatsFull): void {
    this.#state.update((s) => ({ ...s, stats, loading: false, error: null }));
  }

  setError(error: string): void {
    this.#state.update((s) => ({ ...s, error, loading: false }));
  }

  /** Rend les stats périmées : le prochain passage sur le profil les recalcule. */
  invalidate(): void {
    this.#state.set({ stats: null, loading: false, error: null });
  }
}
