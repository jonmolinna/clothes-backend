import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { User as UserEntity } from 'src/entities';
import { AppRoles } from 'src/utils/roles';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { SerializedUser } from './types';
import { UsersService } from './users.service';

@Controller('/api/user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @UseGuards(AuthGuard())
  async getAllUser() {
    const users = await this.userService.getAllUsers();
    if (users) {
      return users.map((user) => new SerializedUser(user));
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @UseGuards(AuthGuard())
  async createUser(@Body() dto: CreateUserDto, @GetUser() user: UserEntity) {
    const isAdmin = user.role.name === AppRoles.ADMIN;
    if (!isAdmin) throw new UnauthorizedException('No tienes permiso');

    const userCreated = await this.userService.createUser(dto);
    if (userCreated) return new SerializedUser(userCreated);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: UserEntity,
  ) {
    const isAdmin = user.role.name === AppRoles.ADMIN;
    if (!isAdmin) {
      throw new UnauthorizedException('No tienes permiso');
    } else {
      return this.userService.deleteUserById(id);
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put('/:id')
  @UseGuards(AuthGuard())
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
    @GetUser() user: UserEntity,
  ) {
    const isAdmin = user.role.name === AppRoles.ADMIN;
    if (!isAdmin) throw new UnauthorizedException('No tienes permiso');

    const userEdit = await this.userService.updateUser(id, dto);
    if (userEdit) return new SerializedUser(userEdit);
  }
}
