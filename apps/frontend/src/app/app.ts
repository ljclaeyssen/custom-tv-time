import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from 'primeng/toast';
import { AuthStore } from './store/auth.store';
import { AppUpdate } from './ui/shared/app-update';
import { BottomNav } from './ui/shared/bottom-nav/bottom-nav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BottomNav, Toast],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly auth = inject(AuthStore);
  readonly #update = inject(AppUpdate);

  constructor() {
    this.#update.init();
  }
}
