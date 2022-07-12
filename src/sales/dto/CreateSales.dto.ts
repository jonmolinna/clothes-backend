import { IsBoolean, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class CreateSalesDto {
  @IsBoolean()
  @IsOptional()
  status: boolean;

  @IsNumber()
  @IsPositive({ message: 'Ingrese el codigo del cliente válido' })
  customerId: number;
}
