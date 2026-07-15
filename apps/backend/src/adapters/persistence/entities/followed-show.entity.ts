import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('followed_shows')
@Index(['userId', 'tmdbShowId'], { unique: true })
export class FollowedShowEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column('uuid')
  userId: string;

  @Column('int')
  tmdbShowId: number;

  @Column({ type: 'int', nullable: true })
  tvdbId: number | null;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  posterPath: string | null;

  @Column({ type: 'text', default: 'watching' })
  status: string;

  @Column({ type: 'timestamptz' })
  followedAt: Date;
}
