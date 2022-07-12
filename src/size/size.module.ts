import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Size } from 'src/entities';
import { SizeController } from './size.controller';
import { SizeService } from './size.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Size]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [SizeController],
  providers: [SizeService],
  exports: [SizeService],
})
export class SizeModule {}
