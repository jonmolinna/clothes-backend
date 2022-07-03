import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, Role } from 'src/entities/';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/CreateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const role = await this.roleRepository.findOne({
      where: { id: dto.roleId },
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    const newUser = new User();
    newUser.name = dto.name.trim().toLowerCase();
    newUser.username = dto.username.trim().toLowerCase();
    newUser.status = dto.status;
    newUser.password = dto.password;
    newUser.role = role;

    return this.userRepository.save(newUser);
  }
}
