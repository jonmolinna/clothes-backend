import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dtos/CreateCustomer.dto';
import { UpdateCustomerDto } from './dtos/UpdateCustomer.dto';

@Controller('/api/customer')
export class CustomersController {
  constructor(private readonly customerService: CustomersService) {}

  @Post()
  async createCustomer(@Body() dto: CreateCustomerDto) {
    return this.customerService.createCustomer(dto);
  }

  @Get()
  async getAllCustomers() {
    return await this.customerService.getAllCustomers();
  }

  @Put('/:id')
  async updateCustomer(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCustomerDto,
  ) {
    return this.customerService.updateCustomer(id, dto);
  }

  @Delete('/:id')
  async deleteCustomer(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.deleteCustomer(id);
  }
}
