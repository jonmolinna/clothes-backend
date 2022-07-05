import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gender } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateGenderDto } from './dto/CreateGender.dto';
import { UpdateGenderDto } from './dto/UpdateGender.dto';

@Injectable()
export class GenderService {
  constructor(
    @InjectRepository(Gender)
    private readonly genderRepository: Repository<Gender>,
  ) {}

  async createGender(dto: CreateGenderDto): Promise<Gender> {
    const newGender = new Gender();
    newGender.name = dto.name.trim().toLowerCase();

    return this.genderRepository.save(newGender);
  }

  async getAllGenders(): Promise<Gender[]> {
    return await this.genderRepository.find();
  }

  async updateGender(id: number, dto: UpdateGenderDto): Promise<Gender> {
    const gender = await this.genderRepository.findOne({ where: { id } });
    if (!gender) throw new NotFoundException('No se encontro el género');

    const editGender = Object.assign(gender, {
      name: dto.name.trim().toLocaleLowerCase() || gender.name,
    });

    return this.genderRepository.save(editGender);
  }

  async deleteGender(id: number) {
    const gender = await this.genderRepository.delete(id);
    if (gender.affected === 0) {
      throw new NotFoundException('No se encontro el género');
    } else {
      throw new HttpException('Género eliminado', HttpStatus.OK);
    }
  }

  async getGenderById(id: number): Promise<Gender> {
    return await this.genderRepository.findOne({ where: { id } });
  }
}
