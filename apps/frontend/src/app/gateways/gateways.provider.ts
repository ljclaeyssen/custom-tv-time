import { Provider } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CatalogGateway } from '../domain/gateways/catalog.gateway';
import { MoviesGateway } from '../domain/gateways/movies.gateway';
import { NotificationGateway } from '../domain/gateways/notification.gateway';
import { ProfileGateway } from '../domain/gateways/profile.gateway';
import { ShowsGateway } from '../domain/gateways/shows.gateway';
import { StatsGateway } from '../domain/gateways/stats.gateway';
import { TokenStorageGateway } from '../domain/gateways/token-storage.gateway';
import { LocalStorageTokenGateway } from './local-storage-token.gateway';
import { RestCatalogGateway } from './rest-catalog.gateway';
import { RestMoviesGateway } from './rest-movies.gateway';
import { RestProfileGateway } from './rest-profile.gateway';
import { RestShowsGateway } from './rest-shows.gateway';
import { RestStatsGateway } from './rest-stats.gateway';
import { ToastNotificationGateway } from './toast-notification.gateway';

export function provideApplicationGateways(): Provider[] {
  return [
    { provide: ProfileGateway, useClass: RestProfileGateway },
    { provide: ShowsGateway, useClass: RestShowsGateway },
    { provide: MoviesGateway, useClass: RestMoviesGateway },
    { provide: CatalogGateway, useClass: RestCatalogGateway },
    { provide: StatsGateway, useClass: RestStatsGateway },
    { provide: TokenStorageGateway, useClass: LocalStorageTokenGateway },
    // MessageService alimente le <p-toast> de App via ToastNotificationGateway.
    MessageService,
    { provide: NotificationGateway, useClass: ToastNotificationGateway },
  ];
}
