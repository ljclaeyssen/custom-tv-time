import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import {
  ApplicationConfig,
  inject,
  isDevMode,
  LOCALE_ID,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { provideApplicationGateways } from './gateways/gateways.provider';
import { provideApplicationStore } from './store/store.provider';
import { appTheme } from './ui/theme/app-theme';
import { authInterceptor } from './ui/interceptors/auth.interceptor';
import { RestoreSession } from './use-cases/restore-session';
import { provideApplicationUseCases } from './use-cases/use-cases.provider';

// Dates en français partout (DatePipe : « 16 déc. 2026 » et non « Dec 16, 2026 »).
registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    provideBrowserGlobalErrorListeners(),
    provideAppInitializer(() => inject(RestoreSession).execute()),
    // Chaque navigation repart du haut de page : on n'arrive jamais sur un
    // écran pré-scrollé (ex. « Vu récemment » au lieu de « À voir »).
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
    ),
    provideHttpClient(withInterceptors([authInterceptor])),
    providePrimeNG({
      theme: {
        preset: appTheme,
        options: { darkModeSelector: '.app-dark' },
      },
    }),
    provideApplicationGateways(),
    provideApplicationUseCases(),
    provideApplicationStore(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
