import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateRolesDto } from './dtos/CreateRoles.dto';
import { UpdateRolesDto } from './dtos/UpdateRoles.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles) private readonly rolRepository: Repository<Roles>,
  ) {}

  async getAllRoles(): Promise<Roles[]> {
    return await this.rolRepository.find();
  }

  async createRol(dto: CreateRolesDto): Promise<Roles> {
    const rol = this.rolRepository.create(dto);
    return await this.rolRepository.save(rol);
  }

  async updateRol(id: number, dto: UpdateRolesDto): Promise<Roles | any> {
    const rol = await this.rolRepository.findOne({ where: { id } });
    if (!rol) throw new NotFoundException('Rol not found');
    const rolEdit = Object.assign(rol, dto);
    return await this.rolRepository.save(rolEdit);
  }

  async deleteRol(id: number) {
    const customer = await this.rolRepository.delete(id);
    if (customer.affected === 0) {
      throw new HttpException('Rol not found', HttpStatus.NOT_FOUND);
    } else {
      return new HttpException('Rol deleted', HttpStatus.OK);
    }
  }
}
