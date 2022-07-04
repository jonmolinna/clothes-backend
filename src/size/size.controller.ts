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
import { CreateSizeDto } from './dto/CreateSize.dto';
import { UpdateSizeDto } from './dto/UpdateSize';
import { SizeService } from './size.service';

@Controller('/api/size')
export class SizeController {
  constructor(private readonly sizeService: SizeService) {}

  @Post()
  async createSize(@Body() dto: CreateSizeDto) {
    return await this.sizeService.createSize(dto);
  }

  @Get()
  async getAllSize() {
    return await this.sizeService.getAllSize();
  }

  @Put('/:id')
  async updateSize(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSizeDto,
  ) {
    return this.sizeService.updateSize(id, dto);
  }

  @Delete('/:id')
  async deleteSize(@Param('id', ParseIntPipe) id: number) {
    return await this.sizeService.deleteSize(id);
  }
}
