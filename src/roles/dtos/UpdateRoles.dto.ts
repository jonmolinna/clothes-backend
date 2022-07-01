import { CreateRolesDto } from './CreateRoles.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateRolesDto extends PartialType(CreateRolesDto) {}
