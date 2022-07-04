import { CreateSizeDto } from './CreateSize.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateSizeDto extends PartialType(CreateSizeDto) {}
