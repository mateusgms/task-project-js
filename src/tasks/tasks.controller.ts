import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskPipe } from './create-tasks.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Post('new/:projectId')
  create(
    @Param('projectId') projectId: number,
    @Body(CreateTaskPipe) createTaskDto: CreateTaskDto,
  ) {
    createTaskDto = {
      ...createTaskDto,
      project: projectId,
      startAt: new Date(Date.now()),
    };
    return this.tasksService.create(createTaskDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':projectId')
  findAll(@Param('project') projectId: number) {
    return this.tasksService.findAll(projectId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
