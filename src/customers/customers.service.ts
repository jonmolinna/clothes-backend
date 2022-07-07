import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Customer } from '../entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dtos/CreateCustomer.dto';
import { UpdateCustomerDto } from './dtos/UpdateCustomer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async getOneCustomerById(id: number): Promise<Customer> {
    return await this.customerRepository.findOne({ where: { id } });
  }

  async getAllCustomers(): Promise<Customer[]> {
    return await this.customerRepository.find();
  }

  async createCustomer(dto: CreateCustomerDto): Promise<Customer> {
    const customer = this.customerRepository.create(dto);
    return await this.customerRepository.save(customer);
  }

  async updateCustomer(
    id: number,
    dto: UpdateCustomerDto,
  ): Promise<Customer | null> {
    const customer = await this.customerRepository.findOne({ where: { id } });
    if (!customer) throw new NotFoundException('Customer no found');
    const editCustomer = Object.assign(customer, dto);
    return await this.customerRepository.save(editCustomer);
  }

  async deleteCustomer(id: number) {
    const customer = await this.customerRepository.delete(id);
    if (customer.affected === 0) {
      throw new NotFoundException('No se encontro el cliente');
    } else {
      return new HttpException('Se elimino el cliente', HttpStatus.OK);
    }
  }
}
