import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateCidadeDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  codigoIbge: number;

  @IsNumber()
  @IsNotEmpty()
  idEstado: number;
}