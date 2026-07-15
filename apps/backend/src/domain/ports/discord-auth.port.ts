import { DiscordProfile } from '../models/user.model';

export abstract class DiscordAuthPort {
  abstract getAuthorizationUrl(state: string): string;
  abstract exchangeCode(code: string): Promise<DiscordProfile>;
}
