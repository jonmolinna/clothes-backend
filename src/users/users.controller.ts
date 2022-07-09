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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/user.decorator';
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
  async createUser(@Body() dto: CreateUserDto, @GetUser() user) {
    const userCreated = await this.userService.createUser(dto, user);
    if (userCreated) return new SerializedUser(userCreated);
  }

  @Delete('/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUserById(id);
  }

  @Put('/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, dto);
  }
}
