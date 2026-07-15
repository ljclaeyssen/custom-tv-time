import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column()
  discordId: string;

  @Column()
  username: string;

  @Column({ type: 'text', nullable: true })
  avatarUrl: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
