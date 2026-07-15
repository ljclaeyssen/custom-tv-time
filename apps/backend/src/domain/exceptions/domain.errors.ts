export class EntityNotFoundError extends Error {
  constructor(entity: string, id: string | number) {
    super(`${entity} "${id}" introuvable.`);
    this.name = 'EntityNotFoundError';
  }
}

export class AlreadyFollowedError extends Error {
  constructor(name: string) {
    super(`La série "${name}" est déjà suivie.`);
    this.name = 'AlreadyFollowedError';
  }
}

export class ExternalServiceError extends Error {
  constructor(service: string, detail: string) {
    super(`Erreur du service externe ${service} : ${detail}`);
    this.name = 'ExternalServiceError';
  }
}

export class AuthenticationFailedError extends Error {
  constructor(detail: string) {
    super(`Authentification échouée : ${detail}`);
    this.name = 'AuthenticationFailedError';
  }
}
