import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateColorDto {
  @IsNotEmpty({ message: 'El color no debe estar vacío' })
  @IsString({ message: 'El color debe ser una cadena' })
  @MaxLength(70, {
    message: 'El color debe ser menor o igual a 70 caracteres',
  })
  @MinLength(2, {
    message: 'El color debe ser mayor o igual a 2 caracteres',
  })
  name: string;
}
