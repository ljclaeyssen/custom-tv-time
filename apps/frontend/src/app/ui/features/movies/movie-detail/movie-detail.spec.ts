import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideFrontendTesting } from '../../../../testing/provide-frontend-testing';
import { MovieDetail } from './movie-detail';

describe('MovieDetail', () => {
  let component: MovieDetail;
  let fixture: ComponentFixture<MovieDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDetail],
      providers: [provideFrontendTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetail);
    fixture.componentRef.setInput('tmdbId', 1);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('affiche le synopsis et les actions pour un film non tracké', () => {
    fixture.detectChanges();

    // FAKE_MOVIE_PROGRESS : non tracké, synopsis de test.
    expect(fixture.nativeElement.querySelector('.overview')?.textContent).toContain(
      'Un film pour les tests.',
    );
    const actions = [...fixture.nativeElement.querySelectorAll('.actions .btn')].map((b) =>
      (b as HTMLElement).textContent?.trim(),
    );
    expect(actions).toEqual(['Marquer vu', 'Watchlist']);
  });
});
