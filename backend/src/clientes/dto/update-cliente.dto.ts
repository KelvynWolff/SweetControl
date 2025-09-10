import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, ValidateNested } from 'class-validator';


class UpdateEnderecoDto {
  @IsString()
  @IsOptional()
  rua?: string;

  @IsString()
  @IsOptional()
  numero?: string;

  @IsString()
  @IsOptional()
  CEP?: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  idBairro?: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  idCidade?: number;
}

class UpdateTelefoneDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  numero?: string;
}

class UpdateEmailDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  email?: string;
}

export class UpdateClienteDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  cpfCnpj?: string;
  
  @ValidateNested()
  @Type(() => UpdateEnderecoDto)
  @IsOptional()
  endereco?: UpdateEnderecoDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateTelefoneDto)
  @IsOptional()
  telefones?: UpdateTelefoneDto[];
  
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateEmailDto)
  @IsOptional()
  emails?: UpdateEmailDto[];
}