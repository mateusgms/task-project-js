import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { SignUpDTO } from './auth/dto/signupDTO';
import { SignupPipe } from './auth/signup.pipe';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  async login(@Body() user) {
    return this.authService.login(user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('auth/singup')
  signup(@Body(SignupPipe) newUser: SignUpDTO) {
    return this.authService.signup(newUser);
  }
}
