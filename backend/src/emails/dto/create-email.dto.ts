import { IsNotEmpty, IsString, IsInt, IsPositive, IsEmail, IsOptional } from 'class-validator';

export class CreateEmailDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  observacao?: string;

  @IsInt()
  @IsPositive()
  idPessoa: number;
}