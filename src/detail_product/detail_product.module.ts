import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorsModule } from 'src/colors/colors.module';
import { DetailProduct } from 'src/entities';
import { ProductModule } from 'src/product/product.module';
import { SizeModule } from 'src/size/size.module';
import { DetailProductController } from './detail_product.controller';
import { DetailProductService } from './detail_product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DetailProduct]),
    ProductModule,
    SizeModule,
    ColorsModule,
  ],
  controllers: [DetailProductController],
  providers: [DetailProductService],
  exports: [DetailProductService],
})
export class DetailProductModule {}
