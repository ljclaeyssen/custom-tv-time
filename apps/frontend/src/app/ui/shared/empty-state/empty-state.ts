import { Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  imports: [],
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.scss',
})
export class EmptyState {
  readonly icon = input<string>('pi-inbox');
  readonly message = input.required<string>();
  readonly hint = input<string | null>(null);
}
