import { inject, Injectable } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs';

const CHECK_INTERVAL_MS = 30 * 60 * 1000;
const FRESH_OPEN_MS = 8000;

/**
 * Mise à jour transparente de la PWA : dès qu'une nouvelle version est prête,
 * on l'applique — tout de suite si l'app vient d'être ouverte, sinon au prochain
 * retour au premier plan. Fini le manège kill/relance.
 */
@Injectable({ providedIn: 'root' })
export class AppUpdate {
  readonly #sw = inject(SwUpdate);
  #pending = false;

  init(): void {
    if (!this.#sw.isEnabled) {
      return; // service worker désactivé (dev)
    }

    this.#sw.versionUpdates
      .pipe(filter((e): e is VersionReadyEvent => e.type === 'VERSION_READY'))
      .subscribe(() => {
        this.#pending = true;
        // Ouverture récente : rechargement immédiat et discret vers la dernière version.
        if (performance.now() < FRESH_OPEN_MS) {
          this.#apply();
        }
      });

    this.#sw.unrecoverable.subscribe(() => document.location.reload());

    void this.#sw.checkForUpdate();
    setInterval(() => void this.#sw.checkForUpdate(), CHECK_INTERVAL_MS);

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState !== 'visible') {
        return;
      }
      if (this.#pending) {
        this.#apply();
      } else {
        void this.#sw.checkForUpdate();
      }
    });
  }

  #apply(): void {
    if (!this.#pending) {
      return;
    }
    this.#pending = false;
    void this.#sw.activateUpdate().then(() => document.location.reload());
  }
}
