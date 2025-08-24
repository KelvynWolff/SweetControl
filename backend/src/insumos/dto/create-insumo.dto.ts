import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateInsumoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsNumber()
  @IsPositive()
  valor: number;

  @IsString()
  @IsNotEmpty()
  unidadeMedida: string;

  @IsNumber()
  @IsPositive()
  estoque: number;
}