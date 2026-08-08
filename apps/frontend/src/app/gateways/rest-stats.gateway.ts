import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileStatsFull } from '@ctt/shared-models';
import { StatsGateway } from '../domain/gateways/stats.gateway';

@Injectable()
export class RestStatsGateway extends StatsGateway {
  readonly #http = inject(HttpClient);

  getStats(): Observable<ProfileStatsFull> {
    return this.#http.get<ProfileStatsFull>('/api/me/stats');
  }
}
