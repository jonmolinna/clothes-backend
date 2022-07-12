import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CreateSizeDto } from './dto/CreateSize.dto';
import { UpdateSizeDto } from './dto/UpdateSize';
import { SizeService } from './size.service';
import { User as UserEntity } from 'src/entities';
import { AuthGuard } from '@nestjs/passport';
import { AppRoles } from 'src/utils/roles';
import { GetUser } from 'src/auth/decorators/user.decorator';

@Controller('/api/size')
export class SizeController {
  constructor(private readonly sizeService: SizeService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getAllSize() {
    return await this.sizeService.getAllSize();
  }

  @Post()
  @UseGuards(AuthGuard())
  async createSize(@Body() dto: CreateSizeDto, @GetUser() user: UserEntity) {
    const isAdmin = user?.role?.name === AppRoles.ADMIN;
    if (!isAdmin) throw new UnauthorizedException('No tienes permiso');

    return await this.sizeService.createSize(dto);
  }

  @Put('/:id')
  @UseGuards(AuthGuard())
  async updateSize(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSizeDto,
    @GetUser() user: UserEntity,
  ) {
    const isAdmin = user?.role?.name === AppRoles.ADMIN;
    if (!isAdmin) throw new UnauthorizedException('No tienes permiso');

    return this.sizeService.updateSize(id, dto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  async deleteSize(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: UserEntity,
  ) {
    const isAdmin = user.role.name === AppRoles.ADMIN;
    if (!isAdmin) {
      throw new UnauthorizedException('No tienes permiso');
    } else {
      return await this.sizeService.deleteSize(id);
    }
  }
}
