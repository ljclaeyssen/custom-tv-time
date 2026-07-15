import { computed, Injectable, signal } from '@angular/core';
import { CatalogSearchResult } from '../domain/models/catalog.model';

interface ExploreState {
  query: string;
  results: CatalogSearchResult[];
  loading: boolean;
  error: string | null;
}

@Injectable({ providedIn: 'root' })
export class ExploreStore {
  readonly #state = signal<ExploreState>({ query: '', results: [], loading: false, error: null });

  readonly query = computed(() => this.#state().query);
  readonly results = computed(() => this.#state().results);
  readonly loading = computed(() => this.#state().loading);
  readonly error = computed(() => this.#state().error);

  setQuery(query: string): void {
    this.#state.update((s) => ({ ...s, query }));
  }

  setResults(results: CatalogSearchResult[]): void {
    this.#state.update((s) => ({ ...s, results, loading: false, error: null }));
  }

  setLoading(loading: boolean): void {
    this.#state.update((s) => ({ ...s, loading }));
  }

  setError(error: string): void {
    this.#state.update((s) => ({ ...s, error, loading: false }));
  }
}
