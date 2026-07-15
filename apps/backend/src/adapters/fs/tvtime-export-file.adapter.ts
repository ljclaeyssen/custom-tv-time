import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { TvtimeExport, TvtimeSeenFlags } from '../../domain/models/tvtime-export.model';
import { TvtimeExportPort } from '../../domain/ports/tvtime-export.port';
import { EntityNotFoundError } from '../../domain/exceptions/domain.errors';

@Injectable()
export class TvtimeExportFileAdapter extends TvtimeExportPort {
  readonly #path: string;
  readonly #seenFlagsPath: string;

  constructor(config: ConfigService) {
    super();
    this.#path = resolve(
      process.cwd(),
      config.get<string>('TVTIME_EXPORT_PATH', 'tvtime-export/tvtime-full-export.json'),
    );
    this.#seenFlagsPath = config.get<string>('TVTIME_SEEN_FLAGS_PATH', '')
      ? resolve(process.cwd(), config.get<string>('TVTIME_SEEN_FLAGS_PATH', ''))
      : join(dirname(this.#path), 'tvtime-seen-flags.json');
  }

  async load(): Promise<TvtimeExport> {
    try {
      const raw = await readFile(this.#path, 'utf-8');
      return JSON.parse(raw) as TvtimeExport;
    } catch {
      throw new EntityNotFoundError('Export TV Time', this.#path);
    }
  }

  async loadSeenFlags(): Promise<TvtimeSeenFlags | null> {
    try {
      const raw = await readFile(this.#seenFlagsPath, 'utf-8');
      return JSON.parse(raw) as TvtimeSeenFlags;
    } catch {
      // Fichier optionnel : sans lui, l'import se contente des watch events.
      return null;
    }
  }
}
