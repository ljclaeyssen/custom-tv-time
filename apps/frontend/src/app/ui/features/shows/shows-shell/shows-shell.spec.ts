import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideFrontendTesting } from '../../../../testing/provide-frontend-testing';
import { ShowsShell } from './shows-shell';

describe('ShowsShell', () => {
  let component: ShowsShell;
  let fixture: ComponentFixture<ShowsShell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowsShell],
      providers: [provideFrontendTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowsShell);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
