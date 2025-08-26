import { IsNotEmpty, IsString, IsInt, IsPositive, IsOptional } from 'class-validator';

export class CreateTelefoneDto {
  @IsString()
  @IsNotEmpty()
  numero: string;

  @IsString()
  @IsOptional()
  observacao?: string;

  @IsInt()
  @IsPositive()
  idPessoa: number;
}