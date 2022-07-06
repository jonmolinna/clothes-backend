import { Body, Controller, Get, Post } from '@nestjs/common';
import { DetailProductService } from './detail_product.service';
import { CreateDetailProductDto } from './dto/CreateDetailProduct.dto';

@Controller('/api/detail-product')
export class DetailProductController {
  constructor(private readonly detailProductService: DetailProductService) {}

  @Post()
  async createDetailProduct(@Body() dto: CreateDetailProductDto) {
    return this.detailProductService.createDetailProduct(dto);
  }

  @Get()
  async getALLDetailProducts() {
    return await this.detailProductService.getAllDetailProducts();
  }
}
