import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideFrontendTesting } from '../../../../testing/provide-frontend-testing';
import { WatchNext } from './watch-next';

describe('WatchNext', () => {
  let component: WatchNext;
  let fixture: ComponentFixture<WatchNext>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchNext],
      providers: [provideFrontendTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(WatchNext);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
