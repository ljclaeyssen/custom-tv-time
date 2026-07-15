import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tracked_movies')
@Index(['userId', 'tmdbMovieId'], { unique: true })
export class TrackedMovieEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column('uuid')
  userId: string;

  @Column('int')
  tmdbMovieId: number;

  @Column({ type: 'text', nullable: true })
  imdbId: string | null;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  posterPath: string | null;

  @Column({ type: 'text', nullable: true })
  releaseDate: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  watchedAt: Date | null;

  @CreateDateColumn({ type: 'timestamptz' })
  addedAt: Date;
}
