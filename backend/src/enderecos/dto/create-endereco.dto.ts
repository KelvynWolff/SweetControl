import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsPositive, IsString, ValidateNested } from 'class-validator';

export class CreateEnderecoDto {
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
  @IsInt()
  @IsPositive()
  idPessoa: number;
}
class CreateTelefoneDto {
  @IsString()
  numero: string;
}
class CreateEmailDto {
  @IsString()
  @IsNotEmpty()
  email: string;
}

export class CreateFornecedorDto {
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