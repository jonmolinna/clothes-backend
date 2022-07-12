import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gender } from 'src/entities';
import { GenderController } from './gender.controller';
import { GenderService } from './gender.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Gender]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [GenderController],
  providers: [GenderService],
  exports: [GenderService],
})
export class GenderModule {}
