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
import { UpdateDetailProductDto } from './dto/UpdateDetailProduct.dto';

@Injectable()
export class DetailProductService {
  constructor(
    @InjectRepository(DetailProduct)
    private readonly detailProductRepository: Repository<DetailProduct>,
    private readonly productService: ProductService,
    private readonly sizeService: SizeService,
    private readonly colorService: ColorsService,
  ) {}

  async getOneDetailProductById(id: number): Promise<DetailProduct> {
    return await this.detailProductRepository.findOne({
      where: { id },
      relations: ['product', 'color', 'size'],
    });
  }

  async getAllDetailProducts(): Promise<DetailProduct[]> {
    return await this.detailProductRepository.find({
      relations: ['product', 'color', 'size'],
    });
  }

  async updateSubtractStockById(
    id: number,
    quantityProduct: number,
  ): Promise<DetailProduct> {
    const detailProduct = await this.getOneDetailProductById(id);
    if (!detailProduct) {
      throw new NotFoundException('No se encontro el detalle del producto');
    }

    const editDetailProductByStock = Object.assign(detailProduct, {
      stock: detailProduct.stock - quantityProduct,
    });

    return this.detailProductRepository.save(editDetailProductByStock);
  }

  async updateAddStockById(
    id: number,
    quantityProduct: number,
  ): Promise<DetailProduct> {
    const detailProduct = await this.getOneDetailProductById(id);
    if (!detailProduct) {
      throw new NotFoundException('No se encontro el detalle del producto');
    }

    const editDetailProductByStock = Object.assign(detailProduct, {
      stock: detailProduct.stock + quantityProduct,
    });

    return this.detailProductRepository.save(editDetailProductByStock);
  }

  async createDetailProduct(
    dto: CreateDetailProductDto,
  ): Promise<DetailProduct> {
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

  async updateDetailProduct(
    id: number,
    dto: UpdateDetailProductDto,
  ): Promise<DetailProduct> {
    const detailProduct = await this.getOneDetailProductById(id);
    if (!detailProduct) {
      throw new NotFoundException('No se encontro el detalle del producto');
    }

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

    const editDetailProduct = Object.assign(detailProduct, {
      stock: dto.stock,
      status: dto.status,
      product: product,
      size: size,
      color: color,
    });

    return this.detailProductRepository.save(editDetailProduct);
  }

  async deleteDetailProduct(id: number) {
    const detailProduct = await this.detailProductRepository.delete(id);
    if (detailProduct.affected === 0) {
      throw new NotFoundException('No se encontro el detalle del producto');
    } else {
      throw new HttpException('Detalle del producto eleminado', HttpStatus.OK);
    }
  }
}
