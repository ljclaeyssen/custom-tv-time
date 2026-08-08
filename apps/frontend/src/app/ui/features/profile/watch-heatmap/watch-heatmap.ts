import { Component, computed, input, output } from '@angular/core';
import { MonthCell } from '../../../../domain/models/stats.model';

interface HeatCell {
  cell: MonthCell | null;
  level: number;
}
interface HeatRow {
  year: number;
  cells: HeatCell[];
}

@Component({
  selector: 'app-watch-heatmap',
  imports: [],
  templateUrl: './watch-heatmap.html',
  styleUrl: './watch-heatmap.scss',
})
export class WatchHeatmap {
  readonly monthly = input.required<MonthCell[]>();
  readonly thresholds = input.required<number[]>();

  readonly cellTap = output<MonthCell>();

  protected readonly monthInitials = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

  protected readonly rows = computed<HeatRow[]>(() => {
    const cells = this.monthly();
    const th = this.thresholds();
    if (cells.length === 0) {
      return [];
    }
    const byYear = new Map<number, Map<number, MonthCell>>();
    for (const c of cells) {
      let row = byYear.get(c.year);
      if (!row) {
        row = new Map();
        byYear.set(c.year, row);
      }
      row.set(c.month, c);
    }
    return [...byYear.keys()]
      .sort((a, b) => a - b)
      .map((year) => ({
        year,
        cells: Array.from({ length: 12 }, (_, i) => {
          const cell = byYear.get(year)?.get(i + 1) ?? null;
          return { cell, level: cell ? this.#level(cell.episodes, th) : -1 };
        }),
      }));
  });

  #level(episodes: number, th: number[]): number {
    if (episodes <= 0) return 0;
    if (episodes <= th[0]) return 1;
    if (episodes <= th[1]) return 2;
    if (episodes <= th[2]) return 3;
    if (episodes <= th[3]) return 4;
    return 5;
  }

  protected onTap(hc: HeatCell): void {
    if (hc.cell && hc.cell.episodes > 0) {
      this.cellTap.emit(hc.cell);
    }
  }

  protected yy(year: number): string {
    return `'${String(year).slice(2)}`;
  }
}
