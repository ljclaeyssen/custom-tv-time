import { Provider } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CatalogGateway } from '../domain/gateways/catalog.gateway';
import { MoviesGateway } from '../domain/gateways/movies.gateway';
import { NotificationGateway } from '../domain/gateways/notification.gateway';
import { ProfileGateway } from '../domain/gateways/profile.gateway';
import { ShowsGateway } from '../domain/gateways/shows.gateway';
import { StatsGateway } from '../domain/gateways/stats.gateway';
import { TokenStorageGateway } from '../domain/gateways/token-storage.gateway';
import { ToastNotificationGateway } from '../gateways/toast-notification.gateway';
import {
  DemoCatalogGateway,
  DemoMoviesGateway,
  DemoProfileGateway,
  DemoShowsGateway,
  DemoStatsGateway,
  DemoTokenStorageGateway,
} from './demo.gateways';

/**
 * Providers de la build « demo » (demo.vu.ljclaeyssen.fr) : substitué à
 * gateways.provider.ts par fileReplacements — zéro HTTP, zéro connexion,
 * données statiques réelles et interactions en mémoire.
 */
export function provideApplicationGateways(): Provider[] {
  return [
    { provide: ProfileGateway, useClass: DemoProfileGateway },
    { provide: ShowsGateway, useClass: DemoShowsGateway },
    { provide: MoviesGateway, useClass: DemoMoviesGateway },
    { provide: CatalogGateway, useClass: DemoCatalogGateway },
    { provide: StatsGateway, useClass: DemoStatsGateway },
    { provide: TokenStorageGateway, useClass: DemoTokenStorageGateway },
    MessageService,
    { provide: NotificationGateway, useClass: ToastNotificationGateway },
  ];
}
