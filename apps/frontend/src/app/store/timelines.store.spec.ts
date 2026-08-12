import { TimelineDetail, TimelineItem } from '../domain/models/timeline.model';
import { TimelinesStore } from './timelines.store';

function item(overrides: Partial<TimelineItem> & { id: string; section: string }): TimelineItem {
  return {
    position: 0,
    itemType: 'movie',
    tmdbId: 1,
    seasonNumber: null,
    title: overrides.id,
    posterPath: null,
    releaseDate: null,
    progress: { watchedEpisodes: 0, airedEpisodes: 1, completed: false, upcoming: false },
    remainingMinutes: 0,
    watchedMinutes: 0,
    ...overrides,
  };
}

function detail(items: TimelineItem[]): TimelineDetail {
  return {
    id: 't',
    slug: 't',
    name: 'Test',
    description: null,
    remainingMinutes: 0,
    watchedMinutes: 0,
    items,
  };
}

describe('TimelinesStore', () => {
  let store: TimelinesStore;

  beforeEach(() => {
    store = new TimelinesStore();
  });

  it('groupe les sections par items consécutifs, même label réutilisé plus loin', () => {
    store.setCurrent(
      detail([
        item({ id: 'a1', section: 'Phase 1' }),
        item({ id: 'a2', section: 'Phase 1' }),
        item({ id: 'b1', section: 'Phase 2' }),
        item({ id: 'a3', section: 'Phase 1' }),
      ]),
    );

    expect(store.sections().map((s) => ({ title: s.title, ids: s.items.map((i) => i.id) }))).toEqual([
      { title: 'Phase 1', ids: ['a1', 'a2'] },
      { title: 'Phase 2', ids: ['b1'] },
      { title: 'Phase 1', ids: ['a3'] },
    ]);
  });

  it('agrège par section : complétée seulement si tous les items le sont, temps restant sommé', () => {
    store.setCurrent(
      detail([
        item({
          id: 'a1',
          section: 'Phase 1',
          progress: { watchedEpisodes: 1, airedEpisodes: 1, completed: true, upcoming: false },
        }),
        item({
          id: 'a2',
          section: 'Phase 1',
          progress: { watchedEpisodes: 1, airedEpisodes: 1, completed: true, upcoming: false },
        }),
        item({ id: 'b1', section: 'Phase 2', remainingMinutes: 120 }),
        item({ id: 'b2', section: 'Phase 2', remainingMinutes: 45 }),
      ]),
    );

    const [phase1, phase2] = store.sections();
    expect(phase1.completed).toBe(true);
    expect(phase1.remainingMinutes).toBe(0);
    expect(phase2.completed).toBe(false);
    expect(phase2.remainingMinutes).toBe(165);
  });

  it('pointe le prochain item en sautant les complétés et les « à venir »', () => {
    store.setCurrent(
      detail([
        item({
          id: 'done',
          section: 'S',
          progress: { watchedEpisodes: 1, airedEpisodes: 1, completed: true, upcoming: false },
        }),
        item({
          id: 'future',
          section: 'S',
          progress: { watchedEpisodes: 0, airedEpisodes: 0, completed: false, upcoming: true },
        }),
        item({ id: 'next', section: 'S' }),
      ]),
    );

    expect(store.nextItemId()).toBe('next');
  });

  it('rend null quand tout est vu', () => {
    store.setCurrent(
      detail([
        item({
          id: 'done',
          section: 'S',
          progress: { watchedEpisodes: 1, airedEpisodes: 1, completed: true, upcoming: false },
        }),
      ]),
    );

    expect(store.nextItemId()).toBeNull();
  });
});
