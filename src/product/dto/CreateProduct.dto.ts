import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'El producto no debe estar vacío' })
  @IsString({ message: 'El producto debe ser una cadena' })
  @MaxLength(70, {
    message: 'El producto debe ser menor o igual a 70 caracteres',
  })
  name: string;

  @IsNotEmpty({ message: 'La marca no debe estar vacío' })
  @IsString({ message: 'La marca debe ser una cadena' })
  @MaxLength(200, {
    message: 'La marca debe ser menor o igual a 200 caracteres',
  })
  marca;

  @IsNotEmpty({ message: 'El código no debe estar vacío' })
  @IsString({ message: 'El código debe ser una cadena' })
  @MaxLength(200, {
    message: 'El código debe ser menor o igual a 200 caracteres',
  })
  code;

  @IsNumber()
  price;

  @IsBoolean()
  @IsOptional()
  status;

  @IsOptional()
  @MaxLength(200, {
    message: 'La descripción debe ser menor o igual a 200 caracteres',
  })
  description;

  @IsNumber()
  categoryId;

  @IsNumber()
  genderId;
}
