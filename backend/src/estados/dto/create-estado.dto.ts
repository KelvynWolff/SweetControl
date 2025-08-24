import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateEstadoDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 2, { message: 'A sigla deve ter exatamente 2 caracteres.' })
  sigla: string;

  @IsString()
  @IsNotEmpty()
  nome: string;
}