import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBairroDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsNumber()
  @IsNotEmpty()
  idCidade: number;
}