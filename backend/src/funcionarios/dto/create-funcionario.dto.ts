import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested, IsDateString } from 'class-validator';

class CreateEnderecoDto {
  @IsString()
  rua: string;
  @IsString()
  numero: string;
  @IsString()
  CEP: string;
  @IsNotEmpty()
  idBairro: number;
  @IsNotEmpty()
  idCidade: number;
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

export class CreateFuncionarioDto {
  @IsString()
  @IsNotEmpty()
  nome: string;
  @IsString()
  @IsNotEmpty()
  cpfCnpj: string;

  @IsDateString()
  @IsNotEmpty()
  dataAdmissao: Date;
  
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