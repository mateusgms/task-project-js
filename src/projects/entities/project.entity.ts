import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';
import { User } from '../../users/entities/users.entity';
@Entity('Project', { schema: 'TODO_APP' })
export class Project {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { default: 'some text' })
  title: string;

  @Column('datetime', { name: 'start_at' })
  startAt: Date;

  @Column('datetime', { name: 'end_at', nullable: true })
  endAt?: Date;

  @ManyToOne(() => User, (user) => user.projects, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: number;

  @OneToMany(() => Task, (task) => task.project, { cascade: true })
  tasks?: Task[];
}
