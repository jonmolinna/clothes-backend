import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @MinLength(2)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @MinLength(2)
  username: string;

  @IsBoolean()
  @IsOptional()
  status: boolean;

  @IsString()
  @MinLength(8)
  @MaxLength(50)
  password: string;

  @IsNumber()
  roleId: number;
}
