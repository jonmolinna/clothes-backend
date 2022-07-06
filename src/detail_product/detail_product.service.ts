import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColorsService } from 'src/colors/colors.service';
import { DetailProduct } from 'src/entities';
import { ProductService } from 'src/product/product.service';
import { SizeService } from 'src/size/size.service';
import { Repository } from 'typeorm';
import { CreateDetailProductDto } from './dto/CreateDetailProduct.dto';

@Injectable()
export class DetailProductService {
  constructor(
    @InjectRepository(DetailProduct)
    private readonly detailProductRepository: Repository<DetailProduct>,
    private readonly productService: ProductService,
    private readonly sizeService: SizeService,
    private readonly colorService: ColorsService,
  ) {}

  async createDetailProduct(dto: CreateDetailProductDto) {
    const product = await this.productService.getProductById(dto.productId);
    if (!product) throw new NotFoundException('No se encontro el producto');

    const productSizeId = product.sizes.find((size) => size.id === dto.sizeId);
    if (!productSizeId) throw new NotFoundException('Ingrese una talla válida');

    const productColorId = product.colors.find(
      (color) => color.id === dto.colorId,
    );
    if (!productColorId) throw new NotFoundException('Ingrese un color válido');

    const size = await this.sizeService.getOneSizeById(productSizeId.id);
    if (!size) throw new NotFoundException('No se encontro la talla');

    const color = await this.colorService.getOneColorById(productColorId.id);
    if (!color) throw new NotFoundException('No se encontro el color');

    const newDetailProduct = new DetailProduct();
    newDetailProduct.stock = dto.stock;
    newDetailProduct.status = dto.status;
    newDetailProduct.product = product;
    newDetailProduct.size = size;
    newDetailProduct.color = color;

    return this.detailProductRepository.save(newDetailProduct);
  }

  async getAllDetailProducts() {
    return await this.detailProductRepository.find();
  }
}
