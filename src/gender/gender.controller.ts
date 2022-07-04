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
import { CreateGenderDto } from './dto/CreateGender.dto';
import { UpdateGenderDto } from './dto/UpdateGender.dto';
import { GenderService } from './gender.service';

@Controller('/api/gender')
export class GenderController {
  constructor(private readonly genderService: GenderService) {}

  @Post()
  async createGender(@Body() dto: CreateGenderDto) {
    return this.genderService.createGender(dto);
  }

  @Get()
  async getAllGender() {
    return await this.genderService.getAllGenders();
  }

  @Put('/:id')
  async updateGender(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateGenderDto,
  ) {
    return await this.genderService.updateGender(id, dto);
  }

  @Delete('/:id')
  async deleteGender(@Param('id', ParseIntPipe) id: number) {
    return this.genderService.deleteGender(id);
  }
}
