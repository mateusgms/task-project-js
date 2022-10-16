import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
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
}
