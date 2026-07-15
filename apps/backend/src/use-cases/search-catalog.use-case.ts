import { Injectable } from '@nestjs/common';
import { CatalogSearchResult } from '../domain/models/catalog.model';
import { CatalogPort } from '../domain/ports/catalog.port';

@Injectable()
export class SearchCatalogUseCase {
  constructor(private readonly catalog: CatalogPort) {}

  async execute(query: string, type: 'show' | 'movie' | 'all'): Promise<CatalogSearchResult[]> {
    if (query.trim().length < 2) {
      return [];
    }
    return this.catalog.search(query.trim(), type);
  }
}
