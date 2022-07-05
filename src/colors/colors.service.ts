import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Color } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateColorDto } from './dto/CreateColor.dto';
import { UpdateColorDto } from './dto/UpdateColor.dto';

@Injectable()
export class ColorsService {
  constructor(
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
  ) {}

  async createCategory(dto: CreateColorDto): Promise<Color> {
    const newColor = new Color();
    newColor.name = dto.name.trim().toLocaleLowerCase();

    return this.colorRepository.save(newColor);
  }

  async getAllColors(): Promise<Color[]> {
    return await this.colorRepository.find();
  }

  async updateColor(id: number, dto: UpdateColorDto): Promise<Color> {
    const color = await this.colorRepository.findOne({ where: { id } });
    if (!color) throw new NotFoundException('No se encontro el color');

    const editColor = Object.assign(color, {
      name: dto.name.trim().toLocaleLowerCase() || color.name,
    });

    return this.colorRepository.save(editColor);
  }

  async deleteColor(id: number) {
    const color = await this.colorRepository.delete(id);

    if (color.affected === 0) {
      throw new NotFoundException('No se encontro el color');
    } else {
      throw new HttpException('Color Eliminado', HttpStatus.OK);
    }
  }
}
