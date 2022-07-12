import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateProductDto } from './dto/CreateProduct.dto';
import { UpdateProductDto } from './dto/UpdateProduct';
import { ProductService } from './product.service';
import { User as UserEntity } from 'src/entities';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { AppRoles } from 'src/utils/roles';

@Controller('/api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }

  @Post()
  @UseGuards(AuthGuard())
  async createProduct(
    @Body() dto: CreateProductDto,
    @GetUser() user: UserEntity,
  ) {
    const isAdmin = user?.role?.name === AppRoles.ADMIN;
    if (!isAdmin) throw new UnauthorizedException('No tienes permiso');

    return this.productService.createProduct(dto);
  }

  @Put('/:id')
  @UseGuards(AuthGuard())
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductDto,
    @GetUser() user: UserEntity,
  ) {
    const isAdmin = user?.role?.name === AppRoles.ADMIN;
    if (!isAdmin) throw new UnauthorizedException('No tienes permiso');

    return this.productService.updateProducts(id, dto);
  }
}
