import { IsNotEmpty, IsNumber, IsPositive, IsInt } from 'class-validator';

export class CreateReceitaDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  idProduto: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  idInsumo: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  qtdInsumo: number;
}