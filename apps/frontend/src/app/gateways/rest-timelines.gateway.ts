import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TimelinesGateway } from '../domain/gateways/timelines.gateway';
import { TimelineDetail, TimelineSummary } from '../domain/models/timeline.model';

@Injectable()
export class RestTimelinesGateway extends TimelinesGateway {
  readonly #http = inject(HttpClient);
  readonly #baseUrl = '/api/timelines';

  getTimelines(): Observable<TimelineSummary[]> {
    return this.#http.get<TimelineSummary[]>(this.#baseUrl);
  }

  getTimelineDetail(slug: string): Observable<TimelineDetail> {
    return this.#http.get<TimelineDetail>(`${this.#baseUrl}/${slug}`);
  }

  watchItem(slug: string, itemId: string): Observable<void> {
    return this.#http.post<void>(`${this.#baseUrl}/${slug}/items/${itemId}/watch`, {});
  }
}
