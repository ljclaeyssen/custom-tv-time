import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CatalogSearchResult } from '../../domain/models/catalog.model';
import { SearchCatalogUseCase } from '../../use-cases/search-catalog.use-case';
import { SearchCatalogDto } from '../dto/search-catalog.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('catalog')
@UseGuards(JwtAuthGuard)
export class CatalogController {
  constructor(private readonly searchCatalog: SearchCatalogUseCase) {}

  @Get('search')
  search(@Query() dto: SearchCatalogDto): Promise<CatalogSearchResult[]> {
    return this.searchCatalog.execute(dto.q, dto.type ?? 'all');
  }
}
