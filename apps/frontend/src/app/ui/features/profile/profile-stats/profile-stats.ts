import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { MonthCell } from '../../../../domain/models/stats.model';
import { StatsStore } from '../../../../store/stats.store';
import { RetrieveProfileStatsFull } from '../../../../use-cases/retrieve-profile-stats-full';
import { WatchHeatmap } from '../watch-heatmap/watch-heatmap';

const MONTHS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
const RANK_OPACITY = [1, 0.82, 0.66, 0.5, 0.4, 0.32];

interface Spark {
  w: number;
  h: number;
  line: string;
  area: string;
  dotX: number;
  dotY: number;
  peakYear: number;
  peakEp: number;
  empty: boolean;
}

@Component({
  selector: 'app-profile-stats',
  imports: [WatchHeatmap],
  templateUrl: './profile-stats.html',
  styleUrl: './profile-stats.scss',
})
export class ProfileStats implements OnInit {
  protected readonly store = inject(StatsStore);
  readonly #retrieve = inject(RetrieveProfileStatsFull);

  protected readonly selected = signal<MonthCell | null>(null);
  protected readonly displayDays = signal(0);

  protected readonly seriesPct = computed(() => {
    const st = this.store.stats();
    if (!st || st.screenTime.totalMinutes === 0) {
      return 0;
    }
    return Math.round((st.screenTime.seriesMinutes / st.screenTime.totalMinutes) * 100);
  });

  protected readonly topGenres = computed(() => {
    const st = this.store.stats();
    if (!st) {
      return [];
    }
    const top = st.genres.slice(0, 6);
    const max = top[0]?.minutes || 1;
    return top.map((g, i) => ({
      genre: g.genre,
      pct: g.pct,
      widthPct: Math.max(4, Math.round((g.minutes / max) * 100)),
      opacity: RANK_OPACITY[i] ?? 0.3,
    }));
  });

  protected readonly genre1 = computed(() => this.store.stats()?.genres[0]?.genre?.toUpperCase() ?? '');

  /** Amplitude réelle en années (les années creuses comptent), pour le titre. */
  protected readonly yearsSpan = computed(() => {
    const m = this.store.stats()?.monthly ?? [];
    if (m.length === 0) {
      return 0;
    }
    return m[m.length - 1].year - m[0].year + 1;
  });

  protected readonly spark = computed<Spark>(() => this.#buildSpark());

  constructor() {
    // Compteur animé du hero (respecte prefers-reduced-motion).
    effect((onCleanup) => {
      const st = this.store.stats();
      if (!st) {
        return;
      }
      const target = Math.round(st.screenTime.totalMinutes / 1440);
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) {
        this.displayDays.set(target);
        return;
      }
      const start = performance.now();
      const duration = 1100;
      let raf = 0;
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        this.displayDays.set(Math.round(target * eased));
        if (p < 1) {
          raf = requestAnimationFrame(tick);
        }
      };
      raf = requestAnimationFrame(tick);
      onCleanup(() => cancelAnimationFrame(raf));
    });
  }

  ngOnInit(): void {
    this.#retrieve.execute();
  }

  protected retry(): void {
    this.#retrieve.execute();
  }

  protected onCell(cell: MonthCell): void {
    this.selected.set(cell);
  }

  protected fmt(n: number): string {
    return n.toLocaleString('fr-FR');
  }

  protected monthName(month: number): string {
    return MONTHS[month - 1] ?? '';
  }

  protected hoursOf(minutes: number): number {
    return Math.round(minutes / 60);
  }

  #buildSpark(): Spark {
    const st = this.store.stats();
    const a = st?.annual ?? [];
    const w = 300;
    const h = 64;
    const pad = 6;
    if (a.length < 2) {
      return { w, h, line: '', area: '', dotX: 0, dotY: 0, peakYear: 0, peakEp: 0, empty: true };
    }
    const maxEp = Math.max(...a.map((p) => p.episodes), 1);
    const x = (i: number) => pad + (i / (a.length - 1)) * (w - 2 * pad);
    const y = (v: number) => h - pad - (v / maxEp) * (h - 2 * pad);
    const pts = a.map((p, i) => ({ x: x(i), y: y(p.episodes), year: p.year, episodes: p.episodes }));
    const coords = pts.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' L');
    const line = `M${coords}`;
    const area = `M${pts[0].x.toFixed(1)} ${h - pad} L${coords} L${pts[pts.length - 1].x.toFixed(1)} ${h - pad} Z`;
    const peak = pts.reduce((m, p) => (p.episodes > m.episodes ? p : m));
    return { w, h, line, area, dotX: peak.x, dotY: peak.y, peakYear: peak.year, peakEp: peak.episodes, empty: false };
  }
}
