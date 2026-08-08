import { Observable } from 'rxjs';
import { ProfileStatsFull } from '../models/stats.model';

export abstract class StatsGateway {
  abstract getStats(): Observable<ProfileStatsFull>;
}
