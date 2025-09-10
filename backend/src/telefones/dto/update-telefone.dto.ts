import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateTelefoneDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  numero?: string;

  @IsString()
  @IsOptional()
  observacao?: string;
}