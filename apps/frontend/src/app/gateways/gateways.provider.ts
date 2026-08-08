import { Provider } from '@angular/core';
import { CatalogGateway } from '../domain/gateways/catalog.gateway';
import { MoviesGateway } from '../domain/gateways/movies.gateway';
import { ProfileGateway } from '../domain/gateways/profile.gateway';
import { ShowsGateway } from '../domain/gateways/shows.gateway';
import { StatsGateway } from '../domain/gateways/stats.gateway';
import { RestCatalogGateway } from './rest-catalog.gateway';
import { RestMoviesGateway } from './rest-movies.gateway';
import { RestProfileGateway } from './rest-profile.gateway';
import { RestShowsGateway } from './rest-shows.gateway';
import { RestStatsGateway } from './rest-stats.gateway';

export function provideApplicationGateways(): Provider[] {
  return [
    { provide: ProfileGateway, useClass: RestProfileGateway },
    { provide: ShowsGateway, useClass: RestShowsGateway },
    { provide: MoviesGateway, useClass: RestMoviesGateway },
    { provide: CatalogGateway, useClass: RestCatalogGateway },
    { provide: StatsGateway, useClass: RestStatsGateway },
  ];
}
