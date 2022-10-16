import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { SignUpDTO } from './dto/signupDTO';

@Injectable()
export class SignupPipe implements PipeTransform {
  transform(value: unknown, _metadata: ArgumentMetadata) {
    const errors: string[] = [];
    console.log(value);
    if (!this.valueHasPassAndConfPass(value)) {
      throw new BadRequestException('Invalid Request Body');
    }
    if (value.password.length < 12) {
      errors.push('password should be at least 12 characters long');
    }
    if (value.password !== value.confirmationPassword) {
      errors.push('password and confirmationPassword do not match');
    }
    if (errors.length) {
      throw new BadRequestException(errors.join('\n'));
    }
    return value;
  }

  private valueHasPassAndConfPass(val: unknown): val is SignUpDTO {
    return (
      typeof val === 'object' &&
      'password' in val &&
      'confirmationPassword' in val
    );
  }
}
