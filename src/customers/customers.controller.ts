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
import { GetUser } from 'src/auth/decorators/user.decorator';
import { AppRoles } from 'src/utils/roles';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dtos/CreateCustomer.dto';
import { UpdateCustomerDto } from './dtos/UpdateCustomer.dto';
import { User as UserEntity } from 'src/entities';
@Controller('/api/customer')
export class CustomersController {
  constructor(private readonly customerService: CustomersService) {}

  @Post()
  @UseGuards(AuthGuard())
  async createCustomer(@Body() dto: CreateCustomerDto) {
    return this.customerService.createCustomer(dto);
  }

  @Get()
  @UseGuards(AuthGuard())
  async getAllCustomers() {
    return await this.customerService.getAllCustomers();
  }

  @Put('/:id')
  @UseGuards(AuthGuard())
  async updateCustomer(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCustomerDto,
  ) {
    return this.customerService.updateCustomer(id, dto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  async deleteCustomer(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: UserEntity,
  ) {
    const isAdmin = user.role.name === AppRoles.ADMIN;
    if (!isAdmin) {
      throw new UnauthorizedException('No tienes permiso');
    } else {
      return this.customerService.deleteCustomer(id);
    }
  }
}
