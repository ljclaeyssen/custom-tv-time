import { ComponentFixture, TestBed } from '@angular/core/testing';

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
});
