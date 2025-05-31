import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePessoaDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  @Length(11, 14)
  cpfCnpj: string;
}