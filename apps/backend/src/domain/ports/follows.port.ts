import { FollowedShow } from '../models/followed-show.model';

export abstract class FollowsPort {
  abstract findAllByUser(userId: string): Promise<FollowedShow[]>;
  abstract findOne(userId: string, tmdbShowId: number): Promise<FollowedShow | null>;
  abstract add(follow: Omit<FollowedShow, 'id'>): Promise<FollowedShow>;
  abstract updateStatus(userId: string, tmdbShowId: number, status: FollowedShow['status']): Promise<void>;
  abstract remove(userId: string, tmdbShowId: number): Promise<void>;
}
