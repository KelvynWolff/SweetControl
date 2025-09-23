import { IsNotEmpty, IsString, IsEmail, MinLength, IsDateString } from 'class-validator';

export class CreateUsuarioDto {
  @IsEmail({}, { message: 'O login deve ser um email válido.'})
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres.'})
  senha: string;
  
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsDateString()
  @IsNotEmpty()
  dataValidade: Date;
}