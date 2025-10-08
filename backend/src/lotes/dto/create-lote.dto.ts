import { IsNotEmpty, IsNumber, IsInt, IsPositive, IsDateString, IsOptional, ValidateIf } from 'class-validator';

export class CreateLoteDto {
  @IsInt()
  @IsNotEmpty()
  codigoLote: number;

  @IsDateString()
  @IsNotEmpty()
  dataValidade: Date;

  @IsNumber()
  @IsPositive()
  quantidadeInicial: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @ValidateIf(o => !o.idInsumo)
  idProduto?: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @ValidateIf(o => !o.idProduto)
  idInsumo?: number;
}