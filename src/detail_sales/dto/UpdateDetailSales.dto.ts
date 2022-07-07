import { CreateDetailSalesDto } from './CreateDetailSales.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateDetailSalesDto extends PartialType(CreateDetailSalesDto) {}
