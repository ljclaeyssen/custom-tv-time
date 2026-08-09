import { EnvironmentProviders, Provider } from '@angular/core';
import { provideRouter } from '@angular/router';
import { CatalogGateway } from '../domain/gateways/catalog.gateway';
import { MoviesGateway } from '../domain/gateways/movies.gateway';
import { NotificationGateway } from '../domain/gateways/notification.gateway';
import { ProfileGateway } from '../domain/gateways/profile.gateway';
import { ShowsGateway } from '../domain/gateways/shows.gateway';
import { StatsGateway } from '../domain/gateways/stats.gateway';
import { TokenStorageGateway } from '../domain/gateways/token-storage.gateway';
import { provideApplicationUseCases } from '../use-cases/use-cases.provider';
import {
  InMemoryCatalogGateway,
  InMemoryMoviesGateway,
  InMemoryNotificationGateway,
  InMemoryProfileGateway,
  InMemoryShowsGateway,
  InMemoryStatsGateway,
  InMemoryTokenStorageGateway,
} from './in-memory.gateways';

/**
 * Providers de test : les vrais use-cases branchés sur des gateways
 * in-memory (aucun HTTP), plus un routeur qui absorbe toute navigation.
 */
export function provideFrontendTesting(): (Provider | EnvironmentProviders)[] {
  return [
    provideRouter([{ path: '**', children: [] }]),
    provideApplicationUseCases(),
    { provide: ProfileGateway, useClass: InMemoryProfileGateway },
    { provide: ShowsGateway, useClass: InMemoryShowsGateway },
    { provide: MoviesGateway, useClass: InMemoryMoviesGateway },
    { provide: CatalogGateway, useClass: InMemoryCatalogGateway },
    { provide: StatsGateway, useClass: InMemoryStatsGateway },
    { provide: TokenStorageGateway, useClass: InMemoryTokenStorageGateway },
    { provide: NotificationGateway, useClass: InMemoryNotificationGateway },
  ];
}
