import { Observable } from 'rxjs';
import { Profile } from '../models/user.model';

export abstract class ProfileGateway {
  abstract getProfile(): Observable<Profile>;
}
