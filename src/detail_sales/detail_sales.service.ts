import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DetailProductService } from 'src/detail_product/detail_product.service';
import { DetailSale } from 'src/entities';
import { SalesService } from 'src/sales/sales.service';
import { Repository } from 'typeorm';
import { CreateDetailSalesDto } from './dto/CreateDetailSales.dto';

@Injectable()
export class DetailSalesService {
  constructor(
    @InjectRepository(DetailSale)
    private readonly detailSaleRepository: Repository<DetailSale>,
    private readonly saleService: SalesService,
    private readonly detailProduct: DetailProductService,
  ) {}

  async createDetailSale(dto: CreateDetailSalesDto) {
    const sale = await this.saleService.getOneSaleById(dto.saleId);
    if (!sale) throw new NotFoundException('No se encontro la venta');

    const detailProduct = await this.detailProduct.getOneDetailProductById(
      dto.detailProductId,
    );

    if (!detailProduct) {
      throw new NotFoundException('No se encontro el detalle del producto');
    }

    if (dto.quantity > detailProduct.stock) {
      throw new HttpException(
        'No cuenta con suficiente stock',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
