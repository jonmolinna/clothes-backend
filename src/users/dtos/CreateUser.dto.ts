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
  @IsNotEmpty({ message: 'El nombre no debe estar vacío' })
  @IsString({ message: 'El nombre debe ser una cadena' })
  @MaxLength(100, {
    message: 'El nombre debe ser menor o igual a 100 caracteres',
  })
  @MinLength(2, { message: 'El nombre debe ser mayor o igual a 2 caracteres' })
  name: string;

  @IsNotEmpty({ message: 'El nombre de usuario no debe estar vacío' })
  @IsString({ message: 'El nombre de usuario debe ser una cadena' })
  @MaxLength(100, {
    message: 'El nombre de usuario debe ser menor o igual a 100 caracteres',
  })
  @MinLength(5, {
    message: 'El nombre de usuario debe ser mayor o igual a 5 caracteres',
  })
  username: string;

  @IsBoolean()
  @IsOptional()
  status: boolean;

  @MinLength(8, {
    message: 'La contraseña debe ser mayor o igual a 8 caracteres',
  })
  @MaxLength(50, {
    message: 'La contraseña debe ser menor o igual a 50 caracteres',
  })
  password: string;

  @IsNumber()
  roleId: number;
}
