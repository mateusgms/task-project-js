import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @Inject('PROJECT_REPOSITORY')
    private projectRepository: Repository<Project>,
  ) {}
  async create(createProjectDto: CreateProjectDto) {
    return await this.projectRepository.save(createProjectDto);
  }

  async findAll(userId) {
    return await this.projectRepository
      .createQueryBuilder('projects')
      .where('user_id = :id', { id: userId })
      .getMany();
  }

  async update(id: string, updateProjectDto: UpdateProjectDto, userId: string) {
    return await this.projectRepository
      .createQueryBuilder('projects')
      .update(updateProjectDto)
      .set({ title: updateProjectDto.title })
      .where('id = :id', { id: id })
      .andWhere('user_id = :userId', { userId: userId })
      .execute();
  }

  async remove(id: number, userId: number) {
    return this.projectRepository
      .createQueryBuilder('projects')
      .delete()
      .where('id = :id', { id: id })
      .andWhere('user_id = :userId', { userId: userId })
      .execute();
  }
}
