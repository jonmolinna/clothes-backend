import { CreateDetailProductDto } from './CreateDetailProduct.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateDetailProductDto extends PartialType(
  CreateDetailProductDto,
) {}
