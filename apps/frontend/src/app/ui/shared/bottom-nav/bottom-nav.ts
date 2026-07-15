import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-bottom-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './bottom-nav.html',
  styleUrl: './bottom-nav.scss',
})
export class BottomNav {
  protected readonly tabs = [
    { path: '/shows', icon: 'pi-desktop', label: 'Séries' },
    { path: '/explore', icon: 'pi-search', label: 'Explorer' },
    { path: '/movies', icon: 'pi-ticket', label: 'Films' },
    { path: '/profile', icon: 'pi-user', label: 'Profil' },
  ];
}
