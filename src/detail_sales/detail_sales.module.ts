import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailProductModule } from 'src/detail_product/detail_product.module';
import { DetailSale } from 'src/entities';
import { SalesModule } from 'src/sales/sales.module';
import { DetailSalesController } from './detail_sales.controller';
import { DetailSalesService } from './detail_sales.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DetailSale]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    SalesModule,
    DetailProductModule,
  ],
  controllers: [DetailSalesController],
  providers: [DetailSalesService],
})
export class DetailSalesModule {}
