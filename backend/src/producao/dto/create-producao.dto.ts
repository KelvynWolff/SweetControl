import { IsNotEmpty, IsNumber, IsPositive, IsInt, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateProducaoDto {
  @IsInt()
  @IsPositive()
  idProduto: number;

  @IsNumber()
  @IsPositive()
  quantidade: number;

  @IsDateString()
  @IsOptional()
  dataValidade?: Date;

  @IsString()
  @IsOptional()
  observacao?: string;
}