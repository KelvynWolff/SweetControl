import { IsNotEmpty, IsDateString, IsNumber, IsPositive, IsString, IsOptional } from 'class-validator';

export class CreateProducaoDto {
  @IsNumber()
  @IsNotEmpty()
  idProduto: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  quantidade: number;

  @IsString()
  @IsNotEmpty()
  codigoLote: string;
  
  @IsDateString()
  @IsNotEmpty({ message: 'O campo dataValidade não pode estar vazio.' })
  dataValidade: Date;

  @IsString()
  @IsOptional()
  observacao?: string;
}