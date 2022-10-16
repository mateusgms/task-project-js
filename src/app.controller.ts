import {
  Controller,
  Get,
  Request,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { SignUpDTO } from './auth/dto/signupDTO';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { SignupPipe } from './auth/signup.pipe';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  async login(@Body() user) {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('auth/singup')
  signup(@Body(SignupPipe) newUser: SignUpDTO) {
    return this.authService.signup(newUser);
  }
}
