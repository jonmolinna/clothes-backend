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
import { CreateGenderDto } from './dto/CreateGender.dto';
import { UpdateGenderDto } from './dto/UpdateGender.dto';
import { GenderService } from './gender.service';
import { User as UserEntity } from 'src/entities';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { AppRoles } from 'src/utils/roles';

@Controller('/api/gender')
export class GenderController {
  constructor(private readonly genderService: GenderService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getAllGender() {
    return await this.genderService.getAllGenders();
  }

  @Post()
  @UseGuards(AuthGuard())
  async createGender(
    @Body() dto: CreateGenderDto,
    @GetUser() user: UserEntity,
  ) {
    const isAdmin = user?.role?.name === AppRoles.ADMIN;
    if (!isAdmin) throw new UnauthorizedException('No tienes permiso');

    return this.genderService.createGender(dto);
  }

  @Put('/:id')
  @UseGuards(AuthGuard())
  async updateGender(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateGenderDto,
    @GetUser() user: UserEntity,
  ) {
    const isAdmin = user?.role?.name === AppRoles.ADMIN;
    if (!isAdmin) throw new UnauthorizedException('No tienes permiso');

    return await this.genderService.updateGender(id, dto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  async deleteGender(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: UserEntity,
  ) {
    const isAdmin = user.role.name === AppRoles.ADMIN;
    if (!isAdmin) {
      throw new UnauthorizedException('No tienes permiso');
    } else {
      return this.genderService.deleteGender(id);
    }
  }
}
