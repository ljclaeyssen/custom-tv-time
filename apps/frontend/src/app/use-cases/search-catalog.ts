import { inject, Injectable } from '@angular/core';
import { CatalogGateway } from '../domain/gateways/catalog.gateway';
import { ExploreStore } from '../store/explore.store';
import { runQuery } from './run-query';

@Injectable()
export class SearchCatalog {
  readonly #gateway = inject(CatalogGateway);
  readonly #store = inject(ExploreStore);

  execute(query: string, type: 'show' | 'movie' | 'all' = 'all'): void {
    this.#store.setQuery(query);
    if (query.trim().length < 2) {
      this.#store.setResults([]);
      return;
    }
    this.#store.setLoading(true);
    runQuery(this.#gateway.search(query, type), {
      onResult: (results) => {
        // Ignore les réponses arrivées après un changement de recherche.
        if (this.#store.query() === query) {
          this.#store.setResults(results);
        }
      },
      onError: () => this.#store.setLoading(false),
    });
  }
}
