import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileGateway } from '../domain/gateways/profile.gateway';
import { Profile } from '../domain/models/user.model';

@Injectable()
export class RestProfileGateway extends ProfileGateway {
  readonly #http = inject(HttpClient);
  readonly #baseUrl = '/api/me';

  getProfile(): Observable<Profile> {
    return this.#http.get<Profile>(this.#baseUrl);
  }
}
