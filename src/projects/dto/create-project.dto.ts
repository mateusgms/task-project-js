import { IsArray, IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Task } from '../../tasks/entities/task.entity';
import { User } from '../../users/entities/users.entity';

export class CreateProjectDto {
  @IsString()
  title: string;
  @IsDate()
  startAt: Date;

  @IsDate()
  endAt?: Date;
  @IsInt()
  user: number;
  @IsArray()
  tasks?: Task[];
}
