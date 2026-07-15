import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosterCard } from './poster-card';

describe('PosterCard', () => {
  let component: PosterCard;
  let fixture: ComponentFixture<PosterCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PosterCard],
    }).compileComponents();

    fixture = TestBed.createComponent(PosterCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
