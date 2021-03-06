import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DetailSalesService } from './detail_sales.service';
import { CreateDetailSalesDto } from './dto/CreateDetailSales.dto';
import { UpdateDetailSalesDto } from './dto/UpdateDetailSales.dto';

@Controller('/api/detail-sales')
export class DetailSalesController {
  constructor(private readonly detailSaleService: DetailSalesService) {}

  @Post()
  @UseGuards(AuthGuard())
  async createDetailSale(@Body() dto: CreateDetailSalesDto) {
    return await this.detailSaleService.createDetailSale(dto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  async deleteDetailSale(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDetailSalesDto,
  ) {
    return await this.detailSaleService.deleteDetailSale(id, dto);
  }
}
