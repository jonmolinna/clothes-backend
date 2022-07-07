import { Module } from '@nestjs/common';
import { DetailSalesController } from './detail_sales.controller';
import { DetailSalesService } from './detail_sales.service';

@Module({
  controllers: [DetailSalesController],
  providers: [DetailSalesService]
})
export class DetailSalesModule {}
