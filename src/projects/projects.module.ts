import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { DataBaseModule } from '../db/database.module';
import { projectProviders } from './project.providers';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [DataBaseModule, JwtModule, AuthModule, UsersModule],
  providers: [ProjectsService, ...projectProviders],
  controllers: [ProjectsController],
  exports: [ProjectsService],
})
export class ProjectsModule {}
