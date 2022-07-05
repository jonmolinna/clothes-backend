import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Color } from 'src/entities';
import { ColorsController } from './colors.controller';
import { ColorsService } from './colors.service';

@Module({
  imports: [TypeOrmModule.forFeature([Color])],
  controllers: [ColorsController],
  providers: [ColorsService],
})
export class ColorsModule {}
