/** Persistance du jeton de session entre deux ouvertures de l'app. */
export abstract class TokenStorageGateway {
  abstract read(): string | null;
  abstract save(token: string): void;
  abstract clear(): void;
}
