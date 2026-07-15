import { DiscordProfile, User } from '../models/user.model';

export abstract class UsersPort {
  abstract findById(id: string): Promise<User | null>;
  abstract findByDiscordId(discordId: string): Promise<User | null>;
  abstract upsertFromDiscord(profile: DiscordProfile): Promise<User>;
}
