import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
  ) {}
  async findById(userId: number) {
    return this.userRepository.findOneBy({ id: userId });
  }
  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ username: username });
  }
  async create(user: User) {
    return await this.userRepository.save(user);
  }
}
