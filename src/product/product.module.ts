import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CategoryModule } from 'src/category/category.module';
import { GenderModule } from 'src/gender/gender.module';
import { SizeModule } from 'src/size/size.module';
import { ColorsModule } from 'src/colors/colors.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    CategoryModule,
    GenderModule,
    SizeModule,
    ColorsModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}