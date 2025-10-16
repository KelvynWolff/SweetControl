import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested,
  IsInt,
  IsDateString,
  IsOptional,
} from 'class-validator';

class CreateItemNotaDto {
  @IsNumber()
  @IsPositive()
  quantidade: number;

  @IsNumber()
  @IsPositive()
  precoCompra: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  idProduto?: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  idInsumo?: number;

  @IsString()
  @IsNotEmpty()
  codigoLote: string;

  @IsOptional()
  @IsDateString({}, { message: 'dataValidade deve estar no formato ISO 8601 (YYYY-MM-DD)' })
  dataValidade?: string;
}

export class CreateNotaCompraDto {
  @IsString()
  @IsNotEmpty()
  chaveAcesso: string;

  @IsInt()
  @IsPositive()
  idFornecedor: number;

  @IsDateString({}, { message: 'data deve estar no formato ISO 8601 (YYYY-MM-DD)' })
  data: string;

  @IsNumber()
  @IsPositive()
  valorTotal: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateItemNotaDto)
  itens: CreateItemNotaDto[];
}
