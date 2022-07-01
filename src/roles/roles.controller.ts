import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateRolesDto } from './dtos/CreateRoles.dto';
import { UpdateRolesDto } from './dtos/UpdateRoles.dto';
import { RolesService } from './roles.service';

@Controller('rol')
export class RolesController {
  constructor(private readonly rolService: RolesService) {}

  @Get()
  async getAllRoles() {
    return await this.rolService.getAllRoles();
  }

  @Post()
  async createRol(@Body() dto: CreateRolesDto) {
    return await this.rolService.createRol(dto);
  }

  @Put('/:id')
  updateRol(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRolesDto,
  ) {
    return this.rolService.updateRol(id, dto);
  }

  @Delete('/:id')
  deleteRol(@Param('id', ParseIntPipe) id: number) {
    return this.rolService.deleteRol(id);
  }
}
