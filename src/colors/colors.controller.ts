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
import { AuthGuard } from '@nestjs/passport';
import { ColorsService } from './colors.service';
import { CreateColorDto } from './dto/CreateColor.dto';
import { UpdateColorDto } from './dto/UpdateColor.dto';
import { User as UserEntity } from 'src/entities';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { AppRoles } from 'src/utils/roles';

@Controller('/api/color')
export class ColorsController {
  constructor(private readonly colorService: ColorsService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getAllColors() {
    return this.colorService.getAllColors();
  }

  @Post()
  @UseGuards(AuthGuard())
  async createColor(@Body() dto: CreateColorDto, @GetUser() user: UserEntity) {
    const isAdmin = user?.role?.name === AppRoles.ADMIN;
    if (!isAdmin) throw new UnauthorizedException('No tienes permiso');

    return this.colorService.createColor(dto);
  }

  @Put('/:id')
  @UseGuards(AuthGuard())
  async updateColor(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateColorDto,
    @GetUser() user: UserEntity,
  ) {
    const isAdmin = user?.role?.name === AppRoles.ADMIN;
    if (!isAdmin) throw new UnauthorizedException('No tienes permiso');

    return this.colorService.updateColor(id, dto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  async deleteColor(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: UserEntity,
  ) {
    const isAdmin = user.role.name === AppRoles.ADMIN;
    if (!isAdmin) {
      throw new UnauthorizedException('No tienes permiso');
    } else {
      return this.colorService.deleteColor(id);
    }
  }
}
