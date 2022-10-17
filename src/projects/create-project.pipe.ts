import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class CreateProjectPipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata) {
    const errors: string[] = [];

    if (!this.valueHasallRequiredData(value)) {
      throw new BadRequestException('Invalid title or user');
    }
    if (value.title.length < 3 || value.title.split('')[0] === ' ') {
      errors.push(
        'Title should be at least 3 characters long and not start with space',
      );
    }
    if (value.title.split('').filter((c) => c != ' ').length < 3) {
      errors.push('Title should not be only spaces');
    }
    if (errors.length) {
      throw new BadRequestException(errors.join('\n'));
    }
    return value;
  }

  private valueHasallRequiredData(val: unknown): val is CreateProjectDto {
    return typeof val === 'object' && 'title' in val;
  }
}
