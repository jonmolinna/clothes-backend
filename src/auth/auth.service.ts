import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { comparePassword } from 'src/utils/bcrypt';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.getOneUserByUsername(username);

    if (user && comparePassword(password, user.password)) {
      const { password, ...rest } = user;
      return rest;
    } else {
      throw new UnauthorizedException('Credenciales Incorrectos');
    }
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto.username, dto.password);
    const token = await this.jwtService.sign(user);
    return {
      user,
      token,
    };
  }
}
