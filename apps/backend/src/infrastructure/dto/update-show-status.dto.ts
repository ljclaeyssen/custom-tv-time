import { IsIn } from 'class-validator';
import { FollowStatus } from '../../domain/models/followed-show.model';

export class UpdateShowStatusDto {
  @IsIn(Object.values(FollowStatus))
  status: FollowStatus;
}
