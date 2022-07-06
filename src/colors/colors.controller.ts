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
import { ColorsService } from './colors.service';
import { CreateColorDto } from './dto/CreateColor.dto';
import { UpdateColorDto } from './dto/UpdateColor.dto';

@Controller('/api/color')
export class ColorsController {
  constructor(private readonly colorService: ColorsService) {}

  @Post()
  async createColor(@Body() dto: CreateColorDto) {
    return this.colorService.createColor(dto);
  }

  @Get()
  async getAllColors() {
    return this.colorService.getAllColors();
  }

  @Put('/:id')
  async updateColor(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateColorDto,
  ) {
    return this.colorService.updateColor(id, dto);
  }

  @Delete('/:id')
  async deleteColor(@Param('id', ParseIntPipe) id: number) {
    return this.colorService.deleteColor(id);
  }
}
