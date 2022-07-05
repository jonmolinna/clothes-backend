import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Size } from 'src/entities';
import { In, Repository } from 'typeorm';
import { CreateSizeDto } from './dto/CreateSize.dto';
import { UpdateSizeDto } from './dto/UpdateSize';

@Injectable()
export class SizeService {
  constructor(
    @InjectRepository(Size) private readonly sizeRepository: Repository<Size>,
  ) {}

  async createSize(dto: CreateSizeDto): Promise<Size> {
    const newSize = new Size();
    newSize.name = dto.name.trim().toLocaleLowerCase();

    return this.sizeRepository.save(newSize);
  }

  async getAllSize(): Promise<Size[]> {
    return await this.sizeRepository.find();
  }

  async updateSize(id: number, dto: UpdateSizeDto) {
    const size = await this.sizeRepository.findOne({ where: { id } });

    const editSize = Object.assign(size, {
      name: dto.name.trim().toLocaleLowerCase() || size.name,
    });

    return this.sizeRepository.save(editSize);
  }

  async deleteSize(id: number) {
    const size = await this.sizeRepository.delete(id);

    if (size.affected === 0) {
      throw new NotFoundException('No se encontro la talla');
    } else {
      throw new HttpException('Talla eliminado', HttpStatus.OK);
    }
  }

  async getSizesByIds(ids: number[]) {
    return await this.sizeRepository.findBy({ id: In(ids) });
  }
}
