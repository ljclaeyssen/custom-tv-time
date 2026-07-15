import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowsShell } from './shows-shell';

describe('ShowsShell', () => {
  let component: ShowsShell;
  let fixture: ComponentFixture<ShowsShell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowsShell],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowsShell);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
