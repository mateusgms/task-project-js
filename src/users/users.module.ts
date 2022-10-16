import { Module } from '@nestjs/common';
import { DataBaseModule } from '../db/database.module';
import { userProviders } from './user.providers';
import { UsersService } from './users.service';

@Module({
  imports: [DataBaseModule],
  providers: [UsersService, ...userProviders],
  exports: [UsersService],
})
export class UsersModule {}
