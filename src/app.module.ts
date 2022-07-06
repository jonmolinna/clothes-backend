import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { GenderModule } from './gender/gender.module';
import { SizeModule } from './size/size.module';
import { ProductModule } from './product/product.module';
import { ColorsModule } from './colors/colors.module';
import { DetailProductModule } from './detail_product/detail_product.module';
import entities from './entities/';

@Module({
  imports: [
    CustomersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'molina125',
      database: 'clothes_db',
      entities,
      autoLoadEntities: true,
      synchronize: true,
    }),
    RolesModule,
    UsersModule,
    CategoryModule,
    GenderModule,
    SizeModule,
    ProductModule,
    ColorsModule,
    DetailProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
