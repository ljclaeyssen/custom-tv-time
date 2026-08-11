import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideFrontendTesting } from '../../../../testing/provide-frontend-testing';
import { TimelinesList } from './timelines-list';

describe('TimelinesList', () => {
  let component: TimelinesList;
  let fixture: ComponentFixture<TimelinesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelinesList],
      providers: [provideFrontendTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(TimelinesList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
