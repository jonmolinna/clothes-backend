import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/CreateCategory.dto';
import { UpdateCategoryDto } from './dto/UpdateCategory.dto';
import { User as UserEntity } from 'src/entities';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { AppRoles } from 'src/utils/roles';

@Controller('/api/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getAllCategory() {
    return this.categoryService.getAllCategory();
  }

  @Post()
  @UseGuards(AuthGuard())
  async createCategory(
    @Body() dto: CreateCategoryDto,
    @GetUser() user: UserEntity,
  ) {
    const isAdmin = user?.role?.name === AppRoles.ADMIN;
    if (!isAdmin) throw new UnauthorizedException('No tienes permiso');

    return this.categoryService.createCategory(dto);
  }

  @Put('/:id')
  @UseGuards(AuthGuard())
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoryDto,
    @GetUser() user: UserEntity,
  ) {
    const isAdmin = user?.role?.name === AppRoles.ADMIN;
    if (!isAdmin) throw new UnauthorizedException('No tienes permiso');

    return this.categoryService.updateCategory(id, dto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  async deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: UserEntity,
  ) {
    const isAdmin = user.role.name === AppRoles.ADMIN;
    if (!isAdmin) {
      throw new UnauthorizedException('No tienes permiso');
    } else {
      return this.categoryService.deleteCategory(id);
    }
  }
}
