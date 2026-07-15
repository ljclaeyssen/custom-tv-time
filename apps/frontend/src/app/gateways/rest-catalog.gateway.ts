import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatalogGateway } from '../domain/gateways/catalog.gateway';
import { CatalogSearchResult } from '../domain/models/catalog.model';

@Injectable()
export class RestCatalogGateway extends CatalogGateway {
  readonly #http = inject(HttpClient);
  readonly #baseUrl = '/api/catalog';

  search(query: string, type: 'show' | 'movie' | 'all'): Observable<CatalogSearchResult[]> {
    const params = new HttpParams().set('q', query).set('type', type);
    return this.#http.get<CatalogSearchResult[]>(`${this.#baseUrl}/search`, { params });
  }
}
