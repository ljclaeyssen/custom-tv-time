import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { CatalogMovieDetail, CatalogSearchResult } from '../../domain/models/catalog.model';
import { CatalogPort } from '../../domain/ports/catalog.port';
import { SearchCatalogUseCase } from '../../use-cases/search-catalog.use-case';
import { SearchCatalogDto } from '../dto/search-catalog.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('catalog')
@UseGuards(JwtAuthGuard)
export class CatalogController {
  constructor(
    private readonly searchCatalog: SearchCatalogUseCase,
    private readonly catalog: CatalogPort,
  ) {}

  @Get('search')
  search(@Query() dto: SearchCatalogDto): Promise<CatalogSearchResult[]> {
    return this.searchCatalog.execute(dto.q, dto.type ?? 'all');
  }

  @Get('movies/:tmdbId')
  movieDetail(@Param('tmdbId', ParseIntPipe) tmdbId: number): Promise<CatalogMovieDetail> {
    return this.catalog.getMovieDetail(tmdbId);
  }
}
