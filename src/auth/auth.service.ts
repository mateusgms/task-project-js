import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDTO } from './dto/signupDTO';
import { LoginDTO } from './dto/loginDTO';
import { User } from '../users/entities/users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  salt = bcrypt.genSalt();

  findUser(username: string): Promise<User | undefined> {
    return this.usersService.findOne(username);
  }

  createAccessToken(username: string, userId: number): string {
    console.log(userId);
    return this.jwtService.sign({ username: username, userId: userId });
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
      password: await bcrypt.hash(newUser.password, await this.salt),
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      accessToken: '',
    };
    const userSaved = await this.usersService.create(user);
    const token = this.createAccessToken(newUser.username, userSaved.id);
    return { accessToken: token };
  }

  async validateUser(userLogin: LoginDTO, userBd: User): Promise<boolean> {
    return await bcrypt.compare(userLogin.password, userBd.password);
  }

  async login(userLogin: LoginDTO): Promise<{ accessToken: string }> {
    try {
      const validUser: User = await this.findUser(userLogin.username);
      if (!validUser) throw new Error();
      const passwordCrypt = await this.validateUser(userLogin, validUser);
      if (!passwordCrypt) throw new Error();
      return {
        accessToken: this.createAccessToken(userLogin.username, validUser.id),
      };
    } catch (e) {
      throw new UnauthorizedException('Username or password incorrect');
    }
  }
  verifyJwt(payload: string): { username: string; id: string } {
    const jwt = this.jwtService.verify(payload, { secret: 'secretKey' });
    return { username: jwt.username, id: jwt.id };
  }
  extractInfoFromToken(payload: string) {
    const [_, token] = payload.split(' ');
    const jwt = this.jwtService.decode(token);
    return jwt;
  }
}
