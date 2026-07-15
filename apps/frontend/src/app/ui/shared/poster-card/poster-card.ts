import { Component, input } from '@angular/core';
import { ProgressBar } from '../progress-bar/progress-bar';

@Component({
  selector: 'app-poster-card',
  imports: [ProgressBar],
  templateUrl: './poster-card.html',
  styleUrl: './poster-card.scss',
})
export class PosterCard {
  readonly posterUrl = input<string | null>(null);
  readonly name = input.required<string>();
  readonly sublabel = input<string | null>(null);
  readonly progressValue = input<number | null>(null);
  readonly progressTotal = input<number | null>(null);
}
