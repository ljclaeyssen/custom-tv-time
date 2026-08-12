import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelinesGateway } from '../../../../domain/gateways/timelines.gateway';
import { TimelineItem } from '../../../../domain/models/timeline.model';
import {
  FAKE_TIMELINE_DETAIL,
  InMemoryTimelinesGateway,
} from '../../../../testing/in-memory.gateways';
import { provideFrontendTesting } from '../../../../testing/provide-frontend-testing';
import { TimelineDetail } from './timeline-detail';

function fakeItem(overrides: Partial<TimelineItem> & { id: string; section: string }): TimelineItem {
  return {
    position: 0,
    itemType: 'movie',
    tmdbId: 1,
    seasonNumber: null,
    title: overrides.id,
    posterPath: null,
    releaseDate: null,
    progress: { watchedEpisodes: 0, airedEpisodes: 1, completed: false, upcoming: false },
    remainingMinutes: 100,
    ...overrides,
  };
}

const COMPLETED = {
  progress: { watchedEpisodes: 1, airedEpisodes: 1, completed: true, upcoming: false },
  remainingMinutes: 0,
};

describe('TimelineDetail', () => {
  let component: TimelineDetail;
  let fixture: ComponentFixture<TimelineDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelineDetail],
      providers: [provideFrontendTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(TimelineDetail);
    fixture.componentRef.setInput('slug', 'test');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('affiche le temps restant estimé de la frise', () => {
    fixture.detectChanges();

    const chip = fixture.nativeElement.querySelector('.remaining') as HTMLElement;
    // FAKE_TIMELINE_DETAIL : remainingMinutes = 240.
    expect(chip.textContent).toContain('≈ 4 h restantes');
  });

  describe('sections', () => {
    beforeEach(() => {
      const gateway = TestBed.inject(TimelinesGateway) as InMemoryTimelinesGateway;
      gateway.feedWith({
        detail: {
          ...FAKE_TIMELINE_DETAIL,
          items: [
            fakeItem({ id: 'done-1', section: 'Phase 1', ...COMPLETED }),
            fakeItem({ id: 'done-2', section: 'Phase 1', ...COMPLETED }),
            fakeItem({ id: 'todo-1', section: 'Phase 2', remainingMinutes: 120 }),
          ],
        },
      });
      fixture.componentInstance.ngOnInit();
      fixture.detectChanges();
    });

    it('replie par défaut une phase terminée, dépliable au clic', () => {
      const sections = fixture.nativeElement.querySelectorAll('.timeline-section');
      const toggle = sections[0].querySelector('button.section-header') as HTMLButtonElement;

      expect(toggle.textContent).toContain('Complétée');
      expect(sections[0].querySelector('.items')).toBeNull();

      toggle.click();
      fixture.detectChanges();
      expect(sections[0].querySelector('.items')).not.toBeNull();

      toggle.click();
      fixture.detectChanges();
      expect(sections[0].querySelector('.items')).toBeNull();
    });

    it('une phase non terminée reste dépliée, sans bouton, avec son temps restant', () => {
      const sections = fixture.nativeElement.querySelectorAll('.timeline-section');

      expect(sections[1].querySelector('button.section-header')).toBeNull();
      expect(sections[1].querySelector('.section-header')?.textContent).toContain('≈ 2 h');
      expect(sections[1].querySelector('.items')).not.toBeNull();
    });
  });
});
