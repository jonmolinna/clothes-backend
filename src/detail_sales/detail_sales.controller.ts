import { Body, Controller, Post } from '@nestjs/common';
import { DetailSalesService } from './detail_sales.service';
import { CreateDetailSalesDto } from './dto/CreateDetailSales.dto';

@Controller('/api/detail-sales')
export class DetailSalesController {
  constructor(private readonly detailSaleService: DetailSalesService) {}

  @Post()
  async createDetailSale(@Body() dto: CreateDetailSalesDto) {
    return await this.detailSaleService.createDetailSale(dto);
  }
}
