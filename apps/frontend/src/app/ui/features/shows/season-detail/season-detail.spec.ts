import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonDetail } from './season-detail';

describe('SeasonDetail', () => {
  let component: SeasonDetail;
  let fixture: ComponentFixture<SeasonDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeasonDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(SeasonDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
