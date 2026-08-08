import { User } from '../models/user.model';

/** Émission et vérification des jetons du flux d'authentification. */
export abstract class AuthTokensPort {
  abstract signOauthState(): Promise<string>;
  abstract verifyOauthState(state: string): Promise<boolean>;
  abstract signSession(user: User): Promise<string>;
}
