import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateSizeDto {
  @IsNotEmpty({ message: 'La talla no debe estar vacío' })
  @IsString({ message: 'La talla debe ser una cadena' })
  @MaxLength(50, {
    message: 'La talla debe ser menor o igual a 50 caracteres',
  })
  @MinLength(1, {
    message: 'La talla debe ser mayor o igual a 1 caracter',
  })
  name: string;
}
