import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchNext } from './watch-next';

describe('WatchNext', () => {
  let component: WatchNext;
  let fixture: ComponentFixture<WatchNext>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchNext],
    }).compileComponents();

    fixture = TestBed.createComponent(WatchNext);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
