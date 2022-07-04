import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateGenderDto {
  @IsNotEmpty({ message: 'El género no debe estar vacío' })
  @IsString({ message: 'El género debe ser una cadena' })
  @MaxLength(50, {
    message: 'El género debe ser menor o igual a 50 caracteres',
  })
  @MinLength(1, {
    message: 'El género debe ser mayor o igual a 1 caracter',
  })
  name: string;
}
