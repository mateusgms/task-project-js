import { IsString } from 'class-validator';

export class SignUpDTO {
  @IsString()
  username: string;
  @IsString()
  password: string;
  @IsString()
  confirmationPassword: string;
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
}
