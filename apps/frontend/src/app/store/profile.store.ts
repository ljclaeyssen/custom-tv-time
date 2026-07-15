import { computed, Injectable, signal } from '@angular/core';
import { ImportReport } from '../domain/models/user.model';

interface ProfileUiState {
  importing: boolean;
  importReport: ImportReport | null;
  error: string | null;
}

@Injectable({ providedIn: 'root' })
export class ProfileStore {
  readonly #state = signal<ProfileUiState>({ importing: false, importReport: null, error: null });

  readonly importing = computed(() => this.#state().importing);
  readonly importReport = computed(() => this.#state().importReport);
  readonly error = computed(() => this.#state().error);

  setImporting(importing: boolean): void {
    this.#state.update((s) => ({ ...s, importing, error: null }));
  }

  setImportReport(importReport: ImportReport): void {
    this.#state.update((s) => ({ ...s, importReport, importing: false }));
  }

  setError(error: string): void {
    this.#state.update((s) => ({ ...s, error, importing: false }));
  }
}
