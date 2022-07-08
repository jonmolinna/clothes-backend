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
import { UpdateDetailSalesDto } from './dto/UpdateDetailSales.dto';

@Injectable()
export class DetailSalesService {
  constructor(
    @InjectRepository(DetailSale)
    private readonly detailSaleRepository: Repository<DetailSale>,
    private readonly saleService: SalesService,
    private readonly detailProduct: DetailProductService,
  ) {}

  async getOneDetailSaleById(id: number): Promise<DetailSale> {
    return await this.detailSaleRepository.findOne({
      where: { id },
      relations: ['sale', 'detailProduct'],
    });
  }

  async createDetailSale(dto: CreateDetailSalesDto): Promise<DetailSale> {
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
        'No cuentas con suficiente stock',
        HttpStatus.BAD_REQUEST,
      );
    }

    const updateStockDetailProduct =
      await this.detailProduct.updateSubtractStockById(
        detailProduct.id,
        dto.quantity,
      );

    const newDetailSales = new DetailSale();
    newDetailSales.quantity = dto.quantity;
    newDetailSales.unitPrice = detailProduct.product.price;
    newDetailSales.sale = sale;
    newDetailSales.detailProduct = updateStockDetailProduct;

    return this.detailSaleRepository.save(newDetailSales);
  }

  async deleteDetailSale(id: number, dto: UpdateDetailSalesDto) {
    const detailSale = await this.getOneDetailSaleById(id);
    if (!detailSale)
      throw new NotFoundException('No existe el detalle de venta');

    const sale = await this.saleService.getOneSaleById(dto.saleId);
    if (!sale) throw new NotFoundException('No se encontro la venta');

    const detailProduct = await this.detailProduct.getOneDetailProductById(
      dto.detailProductId,
    );
    if (!detailProduct) {
      throw new NotFoundException('No se encontro el detalle del producto');
    }

    const updateStockDetailProduct =
      await this.detailProduct.updateAddStockById(
        detailProduct.id,
        detailSale.quantity,
      );

    const newDetailSale = Object.assign(detailSale, {
      detailProduct: updateStockDetailProduct,
    });

    const deleteDetailSale = await this.detailSaleRepository.delete(id);
    if (deleteDetailSale.affected === 1) {
      return {
        msg: 'Se elimino el detalle de la venta',
        detailProduct: newDetailSale,
      };
    } else {
      throw new NotFoundException('No se encontro el detalle de la venta');
    }
  }
}
