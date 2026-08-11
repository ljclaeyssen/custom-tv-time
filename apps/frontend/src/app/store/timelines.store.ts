import { computed, Injectable, signal } from '@angular/core';
import { TimelineDetail, TimelineItem, TimelineSummary } from '../domain/models/timeline.model';

export interface TimelineSection {
  title: string;
  items: TimelineItem[];
}

interface TimelinesState {
  summaries: TimelineSummary[];
  summariesLoaded: boolean;
  current: TimelineDetail | null;
  loading: boolean;
}

@Injectable({ providedIn: 'root' })
export class TimelinesStore {
  readonly #state = signal<TimelinesState>({
    summaries: [],
    summariesLoaded: false,
    current: null,
    loading: false,
  });

  readonly summaries = computed(() => this.#state().summaries);
  readonly summariesLoaded = computed(() => this.#state().summariesLoaded);
  readonly current = computed(() => this.#state().current);
  readonly loading = computed(() => this.#state().loading);

  /**
   * Sections dérivées de la frise courante : groupement des items CONSÉCUTIFS
   * partageant le même label (rupture = nouvelle section, même si le label
   * réapparaît plus loin).
   */
  readonly sections = computed<TimelineSection[]>(() => {
    const sections: TimelineSection[] = [];
    for (const item of this.#state().current?.items ?? []) {
      const last = sections[sections.length - 1];
      if (last && last.title === item.section) {
        last.items.push(item);
      } else {
        sections.push({ title: item.section, items: [item] });
      }
    }
    return sections;
  });

  /** Prochain item à regarder : le premier ni complété ni « à venir ». */
  readonly nextItemId = computed(
    () =>
      this.#state().current?.items.find((i) => !i.progress.completed && !i.progress.upcoming)
        ?.id ?? null,
  );

  setSummaries(summaries: TimelineSummary[]): void {
    this.#state.update((s) => ({ ...s, summaries, summariesLoaded: true, loading: false }));
  }

  setCurrent(current: TimelineDetail): void {
    this.#state.update((s) => ({ ...s, current, loading: false }));
  }

  clearCurrent(): void {
    this.#state.update((s) => ({ ...s, current: null }));
  }

  setLoading(loading: boolean): void {
    this.#state.update((s) => ({ ...s, loading }));
  }

  invalidate(): void {
    this.#state.update((s) => ({ ...s, summariesLoaded: false }));
  }
}
