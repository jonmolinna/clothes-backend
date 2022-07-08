import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      secretOrKey: 'ULTRA_SECRET',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(JwtUserDecoded) {
    const { username } = JwtUserDecoded;
    const user = this.userService.getOneUserByUsername(username);
    if (!user) {
      throw new UnauthorizedException('No tienes autorización');
    }

    return user;
  }
}
