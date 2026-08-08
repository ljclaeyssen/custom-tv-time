import { Column, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('movie_meta')
export class MovieMetaEntity {
  @PrimaryColumn('int')
  tmdbMovieId: number;

  @Column({ type: 'int', nullable: true })
  runtime: number | null;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
