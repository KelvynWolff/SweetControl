import { IsNotEmpty, IsString, Length, IsInt, IsPositive } from 'class-validator';

export class CreateCidadeDto {
  @IsInt()
  @IsPositive()
  codigobge: number;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 2, { message: 'A sigla do estado deve ter exatamente 2 caracteres.' })
  estado: string;
}