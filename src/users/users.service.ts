import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, Role } from 'src/entities/';
import { encodePassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async getOneUserById(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['role'],
    });
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find({ relations: ['role'] });
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const role = await this.roleRepository.findOne({
      where: { id: dto.roleId },
    });

    if (!role) throw new NotFoundException('No se encontro el rol');

    const user = await this.userRepository.findOne({
      where: { username: dto.username },
    });

    if (user) {
      throw new HttpException(
        'El valor del usuario ya existe',
        HttpStatus.BAD_REQUEST,
      );
    }

    const passwordHash = encodePassword(dto.password);

    const newUser = new User();
    newUser.name = dto.name.trim().toLowerCase();
    newUser.username = dto.username.trim().toLowerCase();
    newUser.status = dto.status;
    newUser.password = passwordHash;
    newUser.role = role;

    return this.userRepository.save(newUser);
  }

  async deleteUserById(id: number) {
    const user = await this.userRepository.delete(id);
    if (user.affected === 0) {
      throw new NotFoundException('No se encontro el usuario');
    } else {
      throw new HttpException('Usuario eliminado', HttpStatus.OK);
    }
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('No se encontro el usuario ');

    const role = await this.roleRepository.findOne({
      where: { id: dto.roleId },
    });

    if (!role) throw new NotFoundException('No se encontro el rol');

    const editUser = Object.assign(user, {
      name: dto.name.trim().toLowerCase() || user.name,
      status: dto.status,
      role: role || user.role,
    });

    return this.userRepository.save(editUser);
  }
}
