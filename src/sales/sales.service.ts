import {
  ConsoleLogger,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomersService } from 'src/customers/customers.service';
import { Sale } from 'src/entities';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateSalesDto } from './dto/CreateSales.dto';
import { v4 as uuid } from 'uuid';
import { UpdateSalesDto } from './dto/UpdateSales.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale) private readonly saleRepository: Repository<Sale>,
    private readonly userService: UsersService,
    private readonly customerService: CustomersService,
  ) {}

  async getOneSaleById(id: number): Promise<Sale> {
    return await this.saleRepository.findOne({ where: { id } });
  }

  async getAllSales(): Promise<Sale[]> {
    return await this.saleRepository.find({
      relations: ['user', 'customer', 'detailSales'],
    });
  }

  async createSale(dto: CreateSalesDto): Promise<Sale> {
    const user = await this.userService.getOneUserById(dto.userId);
    if (!user) throw new NotFoundException('No cuentas con autorización');

    const customer = await this.customerService.getOneCustomerById(
      dto.customerId,
    );
    if (!customer) throw new NotFoundException('No se encontro el cliente');

    const newSale = new Sale();
    newSale.status = dto.status;
    newSale.serialNumber = uuid();
    newSale.user = user;
    newSale.customer = customer;

    return this.saleRepository.save(newSale);
  }

  async updateSale(id: number, dto: UpdateSalesDto) {
    const sale = await this.getOneSaleById(id);
    if (!sale) throw new NotFoundException('No se encontro la venta');

    const user = await this.userService.getOneUserById(dto.userId);
    if (!user) throw new NotFoundException('No cuentas con autorización');

    const customer = await this.customerService.getOneCustomerById(
      dto.customerId,
    );
    if (!customer) throw new NotFoundException('No se encontro el cliente');

    const editSale = Object.assign(sale, {
      status: dto.status,
      serialNumber: sale.serialNumber,
      user: user,
      customer: customer,
    });

    return this.saleRepository.save(editSale);
  }

  async deleteSale(id: number) {
    const sale = await this.saleRepository.delete(id);

    if (sale.affected === 0) {
      throw new NotFoundException('No se encontro la venta');
    } else {
      throw new HttpException('La venta se elimino', HttpStatus.OK);
    }
  }
}
