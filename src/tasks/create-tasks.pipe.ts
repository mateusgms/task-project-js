import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class CreateTaskPipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata) {
    const errors: string[] = [];

    if (!this.valueHasallRequiredData(value)) {
      throw new BadRequestException('Invalid description or project');
    }
    if (
      value.description.length < 3 ||
      value.description.split('')[0] === ' '
    ) {
      errors.push(
        'Description should be at least 3 characters long and not start with space',
      );
    }
    if (value.description.split('').filter((c) => c != ' ').length < 3) {
      errors.push('Description should not be only spaces');
    }
    if (errors.length) {
      throw new BadRequestException(errors.join('\n'));
    }
    return value;
  }

  private valueHasallRequiredData(val: unknown): val is CreateTaskDto {
    return typeof val === 'object' && 'description' in val;
  }
}
