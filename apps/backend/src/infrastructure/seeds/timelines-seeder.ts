import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { SyncTimelinesUseCase } from '../../use-cases/sync-timelines.use-case';
import { TIMELINE_SEEDS } from './frises.seeds';

/**
 * Synchronise les frises versionnées vers la base à chaque démarrage.
 * Non bloquant : un échec est loggé mais ne doit pas empêcher l'app de servir.
 */
@Injectable()
export class TimelinesSeeder implements OnApplicationBootstrap {
  readonly #logger = new Logger(TimelinesSeeder.name);

  constructor(private readonly syncTimelines: SyncTimelinesUseCase) {}

  async onApplicationBootstrap(): Promise<void> {
    try {
      const report = await this.syncTimelines.execute(TIMELINE_SEEDS);
      this.#logger.log(
        `Frises synchronisées : ${report.created} créée(s), ${report.updated} mise(s) à jour, ` +
          `${report.removed} supprimée(s), ${report.unchanged} inchangée(s)`,
      );
    } catch (error) {
      this.#logger.error(
        'Synchronisation des frises échouée',
        error instanceof Error ? error.stack : String(error),
      );
    }
  }
}
