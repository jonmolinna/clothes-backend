import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/';
import { RolesService } from 'src/roles/roles.service';
import { encodePassword } from 'src/utils/bcrypt';
import { isUsernameValid } from 'src/utils/UsernameValid';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly roleService: RolesService,
  ) {}

  async getOneUserById(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['role'],
    });
  }

  async getOneUserByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { username, status: true },
      relations: ['role'],
    });
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    if (!isUsernameValid(dto.username)) {
      throw new BadRequestException('Ingrese un usuario válido');
    }

    const role = await this.roleService.getOneRoleById(dto.roleId);
    if (!role) throw new NotFoundException('No se encontro el rol');

    const user = await this.getOneUserByUsername(dto.username);
    if (user) throw new BadRequestException('El usuario ya existe');

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

    const role = await this.roleService.getOneRoleById(dto.roleId);
    if (!role) throw new NotFoundException('No se encontro el rol');

    const editUser = Object.assign(user, {
      name: dto.name.trim().toLowerCase(),
      status: dto.status,
      role: role,
    });

    return this.userRepository.save(editUser);
  }
}
