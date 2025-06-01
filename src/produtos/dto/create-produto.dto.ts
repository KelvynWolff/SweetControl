import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateProdutoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  unidadeMedida: string;

  @IsNumber()
  @IsPositive()
  estoque: number;

  @IsNumber()
  @IsPositive()
  custo: number;

  @IsNumber()
  @IsPositive()
  margem: number;

  @IsString()
  @IsOptional()
  descricao?: string;
}