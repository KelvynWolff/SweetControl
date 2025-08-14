import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsBoolean } from 'class-validator';

export class CreateProdutoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsNumber()
  @IsPositive()
  preco: number;

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
  margem: number;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsBoolean()
  @IsOptional()
  ativo?: boolean;
}