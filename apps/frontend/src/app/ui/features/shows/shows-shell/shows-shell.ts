import { Component, signal } from '@angular/core';
import { MyShows } from '../my-shows/my-shows';
import { WatchNext } from '../watch-next/watch-next';

@Component({
  selector: 'app-shows-shell',
  imports: [WatchNext, MyShows],
  templateUrl: './shows-shell.html',
  styleUrl: './shows-shell.scss',
})
export class ShowsShell {
  protected readonly tab = signal<'watch-next' | 'my-shows'>('watch-next');
}
