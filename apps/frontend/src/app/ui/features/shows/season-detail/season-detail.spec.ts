import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideFrontendTesting } from '../../../../testing/provide-frontend-testing';
import { SeasonDetail } from './season-detail';

describe('SeasonDetail', () => {
  let component: SeasonDetail;
  let fixture: ComponentFixture<SeasonDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeasonDetail],
      providers: [provideFrontendTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(SeasonDetail);
    fixture.componentRef.setInput('tmdbId', 1);
    fixture.componentRef.setInput('seasonNumber', 1);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
