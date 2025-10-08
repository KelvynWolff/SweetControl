import { IsNotEmpty, IsDateString, IsNumber, IsPositive } from 'class-validator';

export class CreateProducaoDto {
  @IsNumber()
  @IsNotEmpty()
  idProduto: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  quantidade: number;
  
  @IsDateString()
  @IsNotEmpty({ message: 'O campo dataValidade não pode estar vazio.' })
  dataValidade: Date;
}