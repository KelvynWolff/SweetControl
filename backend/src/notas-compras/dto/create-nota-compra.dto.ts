import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, ValidateNested, IsInt, IsDateString, IsOptional, ValidateIf } from 'class-validator';

class CreateItemNotaDto {
  @IsNumber()
  @IsPositive()
  quantidade: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @ValidateIf(o => !o.idInsumo)
  idProduto?: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @ValidateIf(o => !o.idProduto)
  idInsumo?: number;

  @IsInt()
  @IsNotEmpty()
  codigoLote: number;

  @IsDateString()
  @IsNotEmpty()
  dataValidade: Date;
}

export class CreateNotaCompraDto {
  @IsString()
  @IsNotEmpty()
  chaveAcesso: string;

  @IsInt()
  @IsPositive()
  idFornecedor: number;

  @IsDateString()
  data: Date;

  @IsNumber()
  @IsPositive()
  valorTotal: number;
  
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateItemNotaDto)
  itens: CreateItemNotaDto[];
}