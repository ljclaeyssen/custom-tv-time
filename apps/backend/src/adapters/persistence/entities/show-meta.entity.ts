import { Column, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('show_meta')
export class ShowMetaEntity {
  @PrimaryColumn('int')
  tmdbShowId: number;

  @Column({ type: 'jsonb', default: () => "'[]'" })
  genres: string[];

  @Column({ type: 'int', nullable: true })
  episodeRuntime: number | null;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
