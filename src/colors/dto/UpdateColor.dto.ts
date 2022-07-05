import { CreateColorDto } from './CreateColor.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateColorDto extends PartialType(CreateColorDto) {}
