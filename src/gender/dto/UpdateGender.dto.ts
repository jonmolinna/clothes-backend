import { CreateGenderDto } from './CreateGender.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateGenderDto extends PartialType(CreateGenderDto) {}
