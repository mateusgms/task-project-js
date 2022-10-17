import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from '../../projects/entities/project.entity';
import { User } from '../../users/entities/users.entity';

@Entity('Task', { schema: 'TODO_APP' })
export class Task {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @ManyToOne(() => Project, (project) => project.tasks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'project_id', referencedColumnName: 'id' }])
  project: User;

  @Column('enum', { enum: ['TODO', 'DONE'], default: 'TODO' })
  status: 'TODO' | 'DONE';

  @Column('varchar')
  description: string;
  @Column('datetime', { name: 'start_at' })
  startAt: Date;

  @Column('datetime', { name: 'end_at' })
  endAt: Date;
}
