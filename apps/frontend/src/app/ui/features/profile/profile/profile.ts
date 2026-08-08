import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from '../../../../store/auth.store';
import { Logout } from '../../../../use-cases/logout';
import { RetrieveProfile } from '../../../../use-cases/retrieve-profile';
import { ProfileStats } from '../profile-stats/profile-stats';

@Component({
  selector: 'app-profile',
  imports: [ProfileStats],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {
  protected readonly auth = inject(AuthStore);
  readonly #retrieveProfile = inject(RetrieveProfile);
  readonly #logout = inject(Logout);
  readonly #router = inject(Router);

  ngOnInit(): void {
    this.#retrieveProfile.execute();
  }

  protected logout(): void {
    this.#logout.execute();
    void this.#router.navigateByUrl('/login');
  }
}
