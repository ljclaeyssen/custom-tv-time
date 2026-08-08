import { computed, Injectable, signal } from '@angular/core';
import { CatalogSearchResult } from '../domain/models/catalog.model';

interface ExploreState {
  query: string;
  results: CatalogSearchResult[];
  loading: boolean;
}

@Injectable({ providedIn: 'root' })
export class ExploreStore {
  readonly #state = signal<ExploreState>({ query: '', results: [], loading: false });

  readonly query = computed(() => this.#state().query);
  readonly results = computed(() => this.#state().results);
  readonly loading = computed(() => this.#state().loading);

  setQuery(query: string): void {
    this.#state.update((s) => ({ ...s, query }));
  }

  setResults(results: CatalogSearchResult[]): void {
    this.#state.update((s) => ({ ...s, results, loading: false }));
  }

  setLoading(loading: boolean): void {
    this.#state.update((s) => ({ ...s, loading }));
  }
}
