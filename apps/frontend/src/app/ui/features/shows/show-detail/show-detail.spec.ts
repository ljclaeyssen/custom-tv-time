import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowsGateway } from '../../../../domain/gateways/shows.gateway';
import { FAKE_SHOW_PROGRESS, InMemoryShowsGateway } from '../../../../testing/in-memory.gateways';
import { provideFrontendTesting } from '../../../../testing/provide-frontend-testing';
import { ShowDetail } from './show-detail';

describe('ShowDetail', () => {
  let component: ShowDetail;
  let fixture: ComponentFixture<ShowDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowDetail],
      providers: [provideFrontendTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowDetail);
    fixture.componentRef.setInput('tmdbId', 1);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('temps restant et déjà passé', () => {
    beforeEach(() => {
      const gateway = TestBed.inject(ShowsGateway) as InMemoryShowsGateway;
      gateway.feedWith({
        showProgress: {
          ...FAKE_SHOW_PROGRESS,
          watchedCount: 8,
          watchedMinutes: 320,
          remainingMinutes: 120,
          seasons: [
            {
              seasonNumber: 1,
              name: 'Saison 1',
              episodeCount: 10,
              watchedCount: 8,
              posterPath: null,
              airDate: '2021-01-01',
              watchedMinutes: 320,
              remainingMinutes: 120,
            },
          ],
        },
      });
      fixture.componentInstance.ngOnInit();
      fixture.detectChanges();
    });

    it('affiche les deux chips de temps dans l’entête', () => {
      const chips = fixture.nativeElement.querySelector('.time-chips') as HTMLElement;

      expect(chips.textContent).toContain('≈ 2 h restantes');
      expect(chips.textContent).toContain('≈ 5 h 20 min passées');
    });

    it('affiche les temps de la saison sur sa ligne', () => {
      const line = fixture.nativeElement.querySelector('.season-line') as HTMLElement;

      expect(line.textContent).toContain('Saison 1');
      expect(line.textContent).toContain('≈ 2 h');
      expect(line.textContent).toContain('≈ 5 h 20 min');
    });
  });
});
