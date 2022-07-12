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
import { DetailProductService } from './detail_product.service';
import { CreateDetailProductDto } from './dto/CreateDetailProduct.dto';
import { UpdateDetailProductDto } from './dto/UpdateDetailProduct.dto';
import { User as UserEntity } from 'src/entities';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { AppRoles } from 'src/utils/roles';

@Controller('/api/detail-product')
export class DetailProductController {
  constructor(private readonly detailProductService: DetailProductService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getALLDetailProducts() {
    return await this.detailProductService.getAllDetailProducts();
  }

  @Post()
  @UseGuards(AuthGuard())
  async createDetailProduct(
    @Body() dto: CreateDetailProductDto,
    @GetUser() user: UserEntity,
  ) {
    const isAdmin = user?.role?.name === AppRoles.ADMIN;
    if (!isAdmin) throw new UnauthorizedException('No tienes permiso');

    return this.detailProductService.createDetailProduct(dto);
  }

  @Put('/:id')
  @UseGuards(AuthGuard())
  async updateDetailProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDetailProductDto,
    @GetUser() user: UserEntity,
  ) {
    const isAdmin = user?.role?.name === AppRoles.ADMIN;
    if (!isAdmin) throw new UnauthorizedException('No tienes permiso');

    return this.detailProductService.updateDetailProduct(id, dto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  async deleteProduct(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: UserEntity,
  ) {
    const isAdmin = user.role.name === AppRoles.ADMIN;
    if (!isAdmin) {
      throw new UnauthorizedException('No tienes permiso');
    } else {
      return await this.detailProductService.deleteDetailProduct(id);
    }
  }
}
