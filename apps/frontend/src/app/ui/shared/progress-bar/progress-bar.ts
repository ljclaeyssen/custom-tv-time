import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  imports: [],
  templateUrl: './progress-bar.html',
  styleUrl: './progress-bar.scss',
})
export class ProgressBar {
  readonly value = input.required<number>();
  readonly total = input.required<number>();

  protected readonly percent = computed(() => {
    const total = this.total();
    if (total <= 0) {
      return 0;
    }
    return Math.min(100, Math.round((this.value() / total) * 100));
  });
}
