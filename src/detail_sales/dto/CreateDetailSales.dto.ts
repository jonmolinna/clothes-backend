import { IsNumber, IsPositive, Min } from 'class-validator';

export class CreateDetailSalesDto {
  @IsNumber()
  @IsPositive({ message: 'Ingrese un numero positivo' })
  @Min(1, { message: 'Ingrese un numero mayor o igual a uno' })
  quantity: number;

  @IsNumber()
  @IsPositive({ message: 'Ingrese el codigo de la venta válido' })
  saleId: number;

  @IsNumber()
  @IsPositive({ message: 'Ingrese el codigo de detalle de venta válido' })
  detailProductId: number;
}
