import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompleteDiscordLogin } from '../../../../use-cases/complete-discord-login';

@Component({
  selector: 'app-auth-callback',
  imports: [],
  templateUrl: './auth-callback.html',
  styleUrl: './auth-callback.scss',
})
export class AuthCallback implements OnInit {
  readonly #completeDiscordLogin = inject(CompleteDiscordLogin);
  readonly #router = inject(Router);

  ngOnInit(): void {
    const success = this.#completeDiscordLogin.execute(window.location.hash);
    void this.#router.navigateByUrl(success ? '/shows' : '/login', { replaceUrl: true });
  }
}
