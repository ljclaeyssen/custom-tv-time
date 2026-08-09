import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosterImg } from './poster-img';

describe('PosterImg', () => {
  let fixture: ComponentFixture<PosterImg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PosterImg],
    }).compileComponents();

    fixture = TestBed.createComponent(PosterImg);
  });

  it('affiche l’image quand une source est fournie', async () => {
    fixture.componentRef.setInput('src', '/poster.jpg');
    fixture.componentRef.setInput('alt', 'Ma série');
    await fixture.whenStable();

    const img = (fixture.nativeElement as HTMLElement).querySelector('img');
    expect(img?.getAttribute('src')).toBe('/poster.jpg');
    expect(img?.getAttribute('alt')).toBe('Ma série');
    expect((fixture.nativeElement as HTMLElement).querySelector('.placeholder')).toBeNull();
  });

  it('affiche le placeholder sans source', async () => {
    fixture.componentRef.setInput('src', null);
    fixture.componentRef.setInput('alt', 'Ma série');
    await fixture.whenStable();

    expect((fixture.nativeElement as HTMLElement).querySelector('img')).toBeNull();
    expect((fixture.nativeElement as HTMLElement).querySelector('.placeholder')).toBeTruthy();
  });
});
