import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from '../../projects/entities/project.entity';

@Entity('User', { schema: 'TODO_APP' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;
  @Column('varchar')
  username: string;
  @Column('varchar')
  password: string;
  @Column('varchar')
  firstName: string;
  @Column('varchar')
  lastName: string;
  @Column('varchar')
  accessToken: string;
  @OneToMany(() => Project, (project) => project.user, { cascade: true })
  projects?: Project[];
}
