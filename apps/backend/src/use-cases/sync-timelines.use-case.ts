import { Injectable } from '@nestjs/common';
import {
  TimelineItemRecord,
  TimelineSeed,
  TimelineSeedItem,
  TimelineSyncReport,
} from '../domain/models/timeline.model';
import { TimelinesPort } from '../domain/ports/timelines.port';

/** Forme comparable d'une liste d'items : contenu seul, sans identité en base. */
function canonical(items: (TimelineItemRecord | TimelineSeedItem)[]): string {
  return JSON.stringify(
    [...items]
      .sort((a, b) => a.position - b.position)
      .map((i) => [
        i.position,
        i.section,
        i.itemType,
        i.tmdbId,
        i.seasonNumber,
        i.title,
        i.posterPath,
        i.releaseDate,
      ]),
  );
}

/**
 * Met la base en miroir des frises versionnées dans le repo : création, mise à
 * jour (seulement si le contenu diffère, pour préserver les ids d'items),
 * suppression de ce qui n'est plus versionné. Idempotent, exécuté à chaque
 * démarrage — c'est LE canal de publication des frises, dev comme prod.
 */
@Injectable()
export class SyncTimelinesUseCase {
  constructor(private readonly timelines: TimelinesPort) {}

  async execute(seeds: TimelineSeed[]): Promise<TimelineSyncReport> {
    const report: TimelineSyncReport = { created: 0, updated: 0, removed: 0, unchanged: 0 };

    for (const seed of seeds) {
      const meta = {
        slug: seed.slug,
        name: seed.name,
        description: seed.description,
        posterPath: seed.posterPath,
        position: seed.position,
      };
      const existing = await this.timelines.findBySlug(seed.slug);
      if (!existing) {
        const created = await this.timelines.upsertBySlug(meta);
        await this.timelines.replaceItems(created.id, seed.items);
        report.created++;
        continue;
      }

      const metaChanged =
        existing.name !== meta.name ||
        existing.description !== meta.description ||
        existing.posterPath !== meta.posterPath ||
        existing.position !== meta.position;
      if (metaChanged) {
        await this.timelines.upsertBySlug(meta);
      }

      const currentItems = await this.timelines.findItems(existing.id);
      const itemsChanged = canonical(currentItems) !== canonical(seed.items);
      if (itemsChanged) {
        await this.timelines.replaceItems(existing.id, seed.items);
      }

      if (metaChanged || itemsChanged) {
        report.updated++;
      } else {
        report.unchanged++;
      }
    }

    const seeded = new Set(seeds.map((s) => s.slug));
    for (const timeline of await this.timelines.findAll()) {
      if (!seeded.has(timeline.slug)) {
        await this.timelines.removeBySlug(timeline.slug);
        report.removed++;
      }
    }

    return report;
  }
}
