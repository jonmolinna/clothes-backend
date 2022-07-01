import { CreateCustomerDto } from './CreateCustomer.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
