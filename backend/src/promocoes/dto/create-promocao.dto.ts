import { IsNotEmpty, IsNumber, IsPositive, IsString, IsDateString, IsOptional, IsInt } from 'class-validator';

export class CreatePromocaoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  tipoDeDesconto: string;

  @IsNumber()
  @IsPositive()
  valor: number;

  @IsDateString()
  dataInicio: Date;

  @IsDateString()
  dataFim: Date;
  
  @IsInt()
  @IsPositive()
  @IsOptional()
  idProduto?: number;
}