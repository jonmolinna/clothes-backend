import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';

export class CreateDetailProductDto {
  @IsNumber()
  @IsPositive({ message: 'Ingrese un numero positivo' })
  @Min(0, { message: 'Ingrese un numero mayor o igual a cero' })
  stock: number;

  @IsBoolean()
  @IsOptional()
  status: boolean;

  @IsNumber()
  @IsPositive({ message: 'Ingrese el codigo del producto válido' })
  productId: number;

  @IsNumber()
  @IsPositive({ message: 'Ingrese el codigo del color válido' })
  colorId: number;

  @IsNumber()
  @IsPositive({ message: 'Ingrese el codigo de la talla válido' })
  sizeId: number;
}
