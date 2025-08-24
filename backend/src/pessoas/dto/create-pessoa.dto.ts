import { IsNotEmpty, IsString, IsInt, IsPositive } from 'class-validator';

export class CreatePessoaDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  cpfCnpj: string;

  @IsInt()
  @IsPositive()
  idCidade: number;
}