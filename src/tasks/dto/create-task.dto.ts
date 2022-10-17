import { IsString, IsDate, IsInt, IsEnum } from 'class-validator';

enum statusTaskEnum {
  TODO = 'TODO',
  DONE = 'DONE',
}
export class CreateTaskDto {
  @IsString()
  description: string;
  @IsDate()
  startAt: Date;
  @IsDate()
  endAt?: Date;
  @IsInt()
  project: number;
  @IsEnum(statusTaskEnum)
  status?: 'TODO' | 'DONE';
}
