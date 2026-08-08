import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatsGateway } from '../domain/gateways/stats.gateway';
import { ProfileStatsFull } from '../domain/models/stats.model';

@Injectable()
export class RestStatsGateway extends StatsGateway {
  readonly #http = inject(HttpClient);

  getStats(): Observable<ProfileStatsFull> {
    return this.#http.get<ProfileStatsFull>('/api/me/stats');
  }
}
