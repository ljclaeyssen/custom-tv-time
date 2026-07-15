import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, first, tap } from 'rxjs';
import { ProfileGateway } from '../domain/gateways/profile.gateway';
import { ProfileStore } from '../store/profile.store';
import { ShowsStore } from '../store/shows.store';
import { RetrieveProfile } from './retrieve-profile';

@Injectable()
export class ImportTvtimeHistory {
  readonly #gateway = inject(ProfileGateway);
  readonly #profileStore = inject(ProfileStore);
  readonly #showsStore = inject(ShowsStore);
  readonly #retrieveProfile = inject(RetrieveProfile);

  execute(): void {
    this.#profileStore.setImporting(true);
    this.#gateway
      .importTvtime()
      .pipe(
        first(),
        tap((report) => {
          this.#profileStore.setImportReport(report);
          this.#showsStore.invalidateLists();
          this.#retrieveProfile.execute();
        }),
        catchError((error: { message?: string }) => {
          this.#profileStore.setError(error.message ?? "L'import a échoué");
          return EMPTY;
        }),
      )
      .subscribe();
  }
}
