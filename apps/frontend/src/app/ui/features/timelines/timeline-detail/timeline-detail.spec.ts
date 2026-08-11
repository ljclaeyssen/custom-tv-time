import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideFrontendTesting } from '../../../../testing/provide-frontend-testing';
import { TimelineDetail } from './timeline-detail';

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
});
