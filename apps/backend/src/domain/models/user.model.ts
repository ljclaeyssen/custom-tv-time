export type { User } from '@ctt/shared-models';

export interface DiscordProfile {
  discordId: string;
  username: string;
  avatarUrl: string | null;
}
