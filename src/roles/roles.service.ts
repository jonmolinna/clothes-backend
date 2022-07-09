import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateRolesDto } from './dtos/CreateRoles.dto';
import { UpdateRolesDto } from './dtos/UpdateRoles.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly rolRepository: Repository<Role>,
  ) {}

  async getOneRoleById(id: number): Promise<Role> {
    return await this.rolRepository.findOne({ where: { id } });
  }

  async getAllRoles(): Promise<Role[]> {
    return await this.rolRepository.find();
  }

  async getAllUsersByRoles(): Promise<Role[]> {
    return await this.rolRepository.find({ relations: ['users'] });
  }

  async isAdminRole(id: number): Promise<boolean> {
    const role = await this.getOneRoleById(id);
    return role.name === 'admin';
  }

  async createRole(dto: CreateRolesDto): Promise<Role> {
    const newRole = new Role();
    newRole.name = dto.name.trim().toLocaleLowerCase();

    return await this.rolRepository.save(newRole);
  }

  async updateRole(id: number, dto: UpdateRolesDto): Promise<Role | any> {
    const rol = await this.rolRepository.findOne({ where: { id } });
    if (!rol) throw new NotFoundException('No se encontro el rol');
    const rolEdit = Object.assign(rol, dto);
    return await this.rolRepository.save(rolEdit);
  }

  async deleteRol(id: number) {
    const customer = await this.rolRepository.delete(id);
    if (customer.affected === 0) {
      throw new HttpException('Rol not found', HttpStatus.NOT_FOUND);
    } else {
      throw new NotFoundException('Role not found');
    }
  }
}
