import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { ColorsService } from 'src/colors/colors.service';
import { Product } from 'src/entities';
import { GenderService } from 'src/gender/gender.service';
import { SizeService } from 'src/size/size.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/CreateProduct.dto';
import { UpdateProductDto } from './dto/UpdateProduct';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly categoryService: CategoryService,
    private readonly genderService: GenderService,
    private readonly sizeService: SizeService,
    private readonly colorsService: ColorsService,
  ) {}

  async getProductById(id: number) {
    return await this.productRepository.findOne({
      where: { id },
      relations: ['category', 'gender', 'colors', 'sizes'],
    });
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: ['category', 'gender', 'colors', 'size'],
    });
  }

  async createProduct(dto: CreateProductDto): Promise<Product> {
    const category = await this.categoryService.getCategoryById(dto.categoryId);
    if (!category) throw new NotFoundException('No se encuentra la categoria');

    const gender = await this.genderService.getGenderById(dto.genderId);
    if (!gender) throw new NotFoundException('No se encontro el género');

    const sizes = await this.sizeService.getSizesByIds(dto.sizes);
    if (sizes.length < 1) {
      throw new NotFoundException('No se encontraron las tallas');
    }

    const colors = await this.colorsService.getColorsByIds(dto.colors);
    if (colors.length < 1) {
      throw new NotFoundException('No se encontraron los colores');
    }

    const newProduct = new Product();
    newProduct.marca = dto.marca.trim().toLowerCase();
    newProduct.code = dto.code.trim();
    newProduct.price = dto.price;
    newProduct.status = dto.status;
    newProduct.description = dto.description.trim();
    newProduct.category = category;
    newProduct.gender = gender;
    newProduct.sizes = sizes;
    newProduct.colors = colors;

    return this.productRepository.save(newProduct);
  }

  async updateProducts(id: number, dto: UpdateProductDto): Promise<Product> {
    const product = await this.getProductById(id);
    if (!product) throw new NotFoundException('No se encontro el producto');

    const category = await this.categoryService.getCategoryById(dto.categoryId);
    if (!category) throw new NotFoundException('No se encuentra la categoria');

    const gender = await this.genderService.getGenderById(dto.genderId);
    if (!gender) throw new NotFoundException('No se encontro el género');

    const sizes = await this.sizeService.getSizesByIds(dto.sizes);
    if (sizes.length < 1) {
      throw new NotFoundException('No se encontraron las tallas');
    }

    const colors = await this.colorsService.getColorsByIds(dto.colors);
    if (colors.length < 1) {
      throw new NotFoundException('No se encontraron los colores');
    }

    const editProduct = Object.assign(product, {
      marca: dto.marca.trim().toLowerCase() || product.marca,
      code: dto.code.trim() || product.code,
      price: dto.price || product.price,
      status: dto.status,
      description: dto.description.trim() || product.description,
      category: category,
      gender: gender,
      size: sizes,
      colors: colors,
    });

    return this.productRepository.save(editProduct);
  }
}
