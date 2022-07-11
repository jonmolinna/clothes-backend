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
import { GetUser } from 'src/auth/decorators/user.decorator';
import { AppRoles } from 'src/utils/roles';
import { CreateRolesDto } from './dtos/CreateRoles.dto';
import { UpdateRolesDto } from './dtos/UpdateRoles.dto';
import { RolesService } from './roles.service';
import { User as UserEntity } from 'src/entities';

@Controller('/api/rol')
export class RolesController {
  constructor(private readonly rolService: RolesService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getAllRoles() {
    return await this.rolService.getAllRoles();
  }

  @Get('/users')
  @UseGuards(AuthGuard())
  async getAllUsersByRoles() {
    return await this.rolService.getAllUsersByRoles();
  }

  @Post()
  @UseGuards(AuthGuard())
  async createRol(@Body() dto: CreateRolesDto, @GetUser() user: UserEntity) {
    const isSuperAdmin = user.role.name === AppRoles.SUPERADMIN;
    if (!isSuperAdmin) {
      throw new UnauthorizedException('No tienes permiso');
    } else {
      return await this.rolService.createRole(dto);
    }
  }

  @Put('/:id')
  @UseGuards(AuthGuard())
  updateRol(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRolesDto,
    @GetUser() user: UserEntity,
  ) {
    const isSuperAdmin = user.role.name === AppRoles.SUPERADMIN;
    if (!isSuperAdmin) {
      throw new UnauthorizedException('No tienes permiso');
    } else {
      return this.rolService.updateRole(id, dto);
    }
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteRol(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: UserEntity,
  ) {
    const isSuperAdmin = user.role.name === AppRoles.SUPERADMIN;
    if (!isSuperAdmin) {
      throw new UnauthorizedException('No tienes permiso');
    } else {
      return this.rolService.deleteRol(id);
    }
  }
}
