import { IsNotEmpty, IsNumber, IsPositive, IsString, IsDateString, IsInt } from 'class-validator';

export class CreatePagamentoDto {
  @IsInt()
  @IsPositive()
  idPedido: number;

  @IsNumber()
  @IsPositive()
  valor: number;

  @IsString()
  @IsNotEmpty()
  formaPagamento: string;

  @IsDateString()
  @IsNotEmpty()
  dataPagamento: Date;
}