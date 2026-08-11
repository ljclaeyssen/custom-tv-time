import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('timeline_items')
@Index(['timelineId', 'position'], { unique: true })
export class TimelineItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column('uuid')
  timelineId: string;

  // Ordre global continu de la frise ; espacé de 10 (voir creer-frise.md)
  // pour pouvoir intercaler un item sans renuméroter.
  @Column('int')
  position: number;

  @Column('text')
  section: string;

  @Column('text')
  itemType: string;

  @Column('int')
  tmdbId: number;

  @Column({ type: 'int', nullable: true })
  seasonNumber: number | null;

  // Dénormalisé : un item peut ne pas être suivi/tracké par l'utilisateur,
  // afficher la structure d'une frise ne doit déclencher aucun appel TMDB.
  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  posterPath: string | null;

  @Column({ type: 'text', nullable: true })
  releaseDate: string | null;
}
