import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'La marca no debe estar vacío' })
  @IsString({ message: 'La marca debe ser una cadena' })
  @MaxLength(200, {
    message: 'La marca debe ser menor o igual a 200 caracteres',
  })
  marca: string;

  @IsNotEmpty({ message: 'El código no debe estar vacío' })
  @IsString({ message: 'El código debe ser una cadena' })
  @MaxLength(200, {
    message: 'El código debe ser menor o igual a 200 caracteres',
  })
  code: string;

  @IsNumber()
  price: number;

  @IsBoolean()
  @IsOptional()
  status: boolean;

  @IsOptional()
  @MaxLength(200, {
    message: 'La descripción debe ser menor o igual a 200 caracteres',
  })
  description: string;

  @IsNumber()
  categoryId: number;

  @IsNumber()
  genderId: number;

  @IsArray()
  sizes: number[];

  @IsArray()
  colors: number[];
}
