import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/CreateCategory.dto';
import { UpdateCategoryDto } from './dto/UpdateCategory.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createCategory(dto: CreateCategoryDto): Promise<Category> {
    const newCategory = new Category();
    newCategory.name = dto.name.trim().toLocaleLowerCase();

    return this.categoryRepository.save(newCategory);
  }

  async getAllCategory(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async updateCategory(id: number, dto: UpdateCategoryDto): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) throw new NotFoundException('No se encontro la categoria');

    const editCategory = Object.assign(category, {
      name: dto.name.trim().toLocaleLowerCase() || category.name,
    });

    return this.categoryRepository.save(editCategory);
  }

  async deleteCategory(id: number) {
    const category = await this.categoryRepository.delete(id);

    if (category.affected === 0) {
      throw new NotFoundException('No se encontro la categoria');
    } else {
      throw new HttpException('Categoria eliminado', HttpStatus.OK);
    }
  }

  async getCategoryById(id: number): Promise<Category> {
    return await this.categoryRepository.findOne({ where: { id } });
  }
}
