import { Injectable } from '@nestjs/common';
import { User } from './users.model';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      username: 'john',
      firstName: '',
      lastName: '',
      password: 'changeme',
    },
    {
      id: 2,
      username: 'maria',
      firstName: '',
      lastName: '',
      password: 'guess',
    },
  ];
  //TODO findByID
  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
  async add(user: User) {
    return this.users.push(user);
  }
}
