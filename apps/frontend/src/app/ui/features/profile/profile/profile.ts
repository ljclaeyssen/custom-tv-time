import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from '../../../../store/auth.store';
import { ProfileStore } from '../../../../store/profile.store';
import { ImportTvtimeHistory } from '../../../../use-cases/import-tvtime-history';
import { Logout } from '../../../../use-cases/logout';
import { RetrieveProfile } from '../../../../use-cases/retrieve-profile';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {
  protected readonly auth = inject(AuthStore);
  protected readonly store = inject(ProfileStore);
  protected readonly showWarnings = signal(false);
  readonly #retrieveProfile = inject(RetrieveProfile);
  readonly #importTvtime = inject(ImportTvtimeHistory);
  readonly #logout = inject(Logout);
  readonly #router = inject(Router);

  ngOnInit(): void {
    this.#retrieveProfile.execute();
  }

  protected import(): void {
    this.#importTvtime.execute();
  }

  protected logout(): void {
    this.#logout.execute();
    void this.#router.navigateByUrl('/login');
  }
}
