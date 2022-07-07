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
import { CreateSalesDto } from './dto/CreateSales.dto';
import { UpdateSalesDto } from './dto/UpdateSales.dto';
import { SalesService } from './sales.service';

@Controller('/api/sale')
export class SalesController {
  constructor(private readonly saleService: SalesService) {}

  @Post()
  async createSale(@Body() dto: CreateSalesDto) {
    return this.saleService.createSale(dto);
  }

  @Get()
  async getAllSales() {
    return await this.saleService.getAllSales();
  }

  @Put('/:id')
  async updateSale(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSalesDto,
  ) {
    return this.saleService.updateSale(id, dto);
  }

  @Delete('/:id')
  async deleteSale(@Param('id', ParseIntPipe) id: number) {
    return await this.saleService.deleteSale(id);
  }
}
