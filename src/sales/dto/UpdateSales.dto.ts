import { CreateSalesDto } from './CreateSales.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateSalesDto extends PartialType(CreateSalesDto) {}
