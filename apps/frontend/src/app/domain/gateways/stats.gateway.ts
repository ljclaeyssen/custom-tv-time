import { Observable } from 'rxjs';
import { ProfileStatsFull } from '@ctt/shared-models';

export abstract class StatsGateway {
  abstract getStats(): Observable<ProfileStatsFull>;
}
