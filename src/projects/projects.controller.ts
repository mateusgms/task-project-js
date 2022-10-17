import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateProjectPipe } from './create-project.pipe';
import { AuthService } from '../auth/auth.service';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('new')
  create(
    @Body(CreateProjectPipe) createProjectDto: CreateProjectDto,
    @Req() req,
  ) {
    const id = this.authService.extractInfoFromToken(req.headers.authorization)[
      'userId'
    ];
    createProjectDto = {
      ...createProjectDto,
      user: id,
      startAt: new Date(Date.now()),
    };
    return this.projectsService.create(createProjectDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req) {
    const id = this.authService.extractInfoFromToken(req.headers.authorization)[
      'userId'
    ];
    console.log(id);
    return this.projectsService.findAll(id);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @Req() req,
  ) {
    const userId: string = this.authService.extractInfoFromToken(
      req.headers.authorization,
    )['userId'];
    return this.projectsService.update(id, updateProjectDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number, @Req() req) {
    const userId = this.authService.extractInfoFromToken(
      req.headers.authorization,
    )['userId'];
    return this.projectsService.remove(id, userId);
  }
}
