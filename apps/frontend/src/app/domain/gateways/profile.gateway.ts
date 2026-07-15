import { Observable } from 'rxjs';
import { ImportReport, Profile } from '../models/user.model';

export abstract class ProfileGateway {
  abstract getProfile(): Observable<Profile>;
  abstract importTvtime(): Observable<ImportReport>;
}
