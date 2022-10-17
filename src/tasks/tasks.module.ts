import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { DataBaseModule } from '../db/database.module';
import { taskProviders } from './tasks.providers';

@Module({
  imports: [DataBaseModule, JwtModule, AuthModule],
  controllers: [TasksController],
  providers: [TasksService, ...taskProviders],
  exports: [TasksService],
})
export class TasksModule {}
