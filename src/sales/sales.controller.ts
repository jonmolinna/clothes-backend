import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateSalesDto } from './dto/CreateSales.dto';
import { UpdateSalesDto } from './dto/UpdateSales.dto';
import { SalesService } from './sales.service';
import { User as UserEntity } from 'src/entities';
import { GetUser } from 'src/auth/decorators/user.decorator';

@Controller('/api/sale')
export class SalesController {
  constructor(private readonly saleService: SalesService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getAllSales() {
    return await this.saleService.getAllSales();
  }

  @Post()
  @UseGuards(AuthGuard())
  async createSale(@Body() dto: CreateSalesDto, @GetUser() user: UserEntity) {
    return this.saleService.createSale(dto, user.id);
  }

  @Put('/:id')
  @UseGuards(AuthGuard())
  async updateSale(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSalesDto,
    @GetUser() user: UserEntity,
  ) {
    return this.saleService.updateSale(id, dto, user.id);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  async deleteSale(@Param('id', ParseIntPipe) id: number) {
    return await this.saleService.deleteSale(id);
  }
}
