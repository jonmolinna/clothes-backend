import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'La categoria no debe estar vacío' })
  @IsString({ message: 'La categoria debe ser una cadena' })
  @MaxLength(70, {
    message: 'La categoria debe ser menor o igual a 70 caracteres',
  })
  @MinLength(2, {
    message: 'La categoria debe ser mayor o igual a 2 caracteres',
  })
  name: string;
}
