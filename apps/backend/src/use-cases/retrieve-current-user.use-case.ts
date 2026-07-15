import { Injectable } from '@nestjs/common';
import { User } from '../domain/models/user.model';
import { UsersPort } from '../domain/ports/users.port';
import { EntityNotFoundError } from '../domain/exceptions/domain.errors';

@Injectable()
export class RetrieveCurrentUserUseCase {
  constructor(private readonly users: UsersPort) {}

  async execute(userId: string): Promise<User> {
    const user = await this.users.findById(userId);
    if (!user) {
      throw new EntityNotFoundError('Utilisateur', userId);
    }
    return user;
  }
}
