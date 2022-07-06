import { CreateDetailProductDto } from './CreateDetailProduct.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateGenderDto extends PartialType(CreateDetailProductDto) {}
