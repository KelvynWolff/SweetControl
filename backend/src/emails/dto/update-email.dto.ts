import { IsString, IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class UpdateEmailDto {
  @IsEmail({}, { message: 'O formato do email é inválido.' })
  @IsNotEmpty({ message: 'O email não pode ser vazio.' })
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  observacao?: string;
}