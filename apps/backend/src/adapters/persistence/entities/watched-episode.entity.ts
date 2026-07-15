import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('watched_episodes')
@Index(['userId', 'tmdbShowId', 'season', 'episode'], { unique: true })
export class WatchedEpisodeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column('uuid')
  userId: string;

  @Index()
  @Column('int')
  tmdbShowId: number;

  @Column('int')
  season: number;

  @Column('int')
  episode: number;

  @Column({ type: 'timestamptz', nullable: true })
  watchedAt: Date | null;

  @Column({ type: 'text', default: 'manual' })
  source: string;
}
