import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, ValidateNested } from 'class-validator';

class CreateEnderecoDto {
  @IsString()
  rua: string;
  @IsString()
  numero: string;
  @IsString()
  CEP: string;
  @IsInt()
  @IsPositive()
  idBairro: number;
  @IsInt()
  @IsPositive()
  idCidade: number;
}

class CreateTelefoneDto {
  @IsString()
  @IsNotEmpty()
  numero: string;

  @IsString()
  @IsOptional()
  observacao?: string;
}

class CreateEmailDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  observacao?: string;
}

export class CreateClienteDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  cpfCnpj: string;

  @ValidateNested()
  @Type(() => CreateEnderecoDto)
  endereco: CreateEnderecoDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTelefoneDto)
  telefones: CreateTelefoneDto[];
  
  @IsArray()    
  @ValidateNested({ each: true })
  @Type(() => CreateEmailDto)
  emails: CreateEmailDto[];
}