import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, first, tap } from 'rxjs';
import { CatalogGateway } from '../domain/gateways/catalog.gateway';
import { ExploreStore } from '../store/explore.store';

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
    this.#gateway
      .search(query, type)
      .pipe(
        first(),
        tap((results) => {
          // Ignore les réponses arrivées après un changement de recherche.
          if (this.#store.query() === query) {
            this.#store.setResults(results);
          }
        }),
        catchError((error: { message?: string }) => {
          this.#store.setError(error.message ?? 'Recherche impossible');
          return EMPTY;
        }),
      )
      .subscribe();
  }
}
