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
import { DetailProductService } from './detail_product.service';
import { CreateDetailProductDto } from './dto/CreateDetailProduct.dto';
import { UpdateDetailProductDto } from './dto/UpdateDetailProduct.dto';

@Controller('/api/detail-product')
export class DetailProductController {
  constructor(private readonly detailProductService: DetailProductService) {}

  @Get()
  async getALLDetailProducts() {
    return await this.detailProductService.getAllDetailProducts();
  }

  @Post()
  async createDetailProduct(@Body() dto: CreateDetailProductDto) {
    return this.detailProductService.createDetailProduct(dto);
  }

  @Put('/:id')
  async updateDetailProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDetailProductDto,
  ) {
    return this.detailProductService.updateDetailProduct(id, dto);
  }

  @Delete('/:id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return await this.detailProductService.deleteDetailProduct(id);
  }
}
