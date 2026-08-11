import { Observable } from 'rxjs';
import { TimelineDetail, TimelineSummary } from '../models/timeline.model';

export abstract class TimelinesGateway {
  abstract getTimelines(): Observable<TimelineSummary[]>;
  abstract getTimelineDetail(slug: string): Observable<TimelineDetail>;
  abstract watchItem(slug: string, itemId: string): Observable<void>;
}
