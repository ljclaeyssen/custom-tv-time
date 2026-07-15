import { Observable } from 'rxjs';
import { CatalogSearchResult } from '../models/catalog.model';

export abstract class CatalogGateway {
  abstract search(query: string, type: 'show' | 'movie' | 'all'): Observable<CatalogSearchResult[]>;
}
