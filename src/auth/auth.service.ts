import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDTO } from './dto/signupDTO';
import { User } from 'src/users/users.model';
import { LoginDTO } from './dto/loginDTO';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  findUser(username: string): Promise<User | undefined> {
    return this.usersService.findOne(username);
  }

  createAccessToken(username: string): { accessToken: string } {
    return { accessToken: this.jwtService.sign({ sub: username }) };
  }
  async signup(newUser: SignUpDTO): Promise<{ accessToken: string }> {
    if (await this.usersService.findOne(newUser.username)) {
      throw new ConflictException(
        `User with username ${newUser.username} already exists`,
      );
    }
    const user = {
      id: 0,
      username: newUser.username,
      password: newUser.password,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    };
    this.usersService.add(user);
    return this.createAccessToken(user.username);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: LoginDTO): Promise<{ accessToken: string }> {
    try {
      const validUser: User = await this.findUser(user.username);

      if (!user) throw new Error();
      const passwordCrypt = validUser.password;
      if (!passwordCrypt) throw new Error();

      return this.createAccessToken(user.username);
    } catch (e) {
      throw new UnauthorizedException('Username or password incorrect');
    }
  }
}
