import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, ValidateNested, IsInt, IsDateString, IsOptional } from 'class-validator';

class UpdateItemPedidoDto {
  @IsInt()
  @IsPositive()
  @IsOptional()
  idProduto?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  quantidade?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  preco?: number;
}

class UpdatePagamentoDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  valor?: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  formaPagamento?: string;
}

export class UpdatePedidoDto {
  @IsInt()
  @IsPositive()
  @IsOptional()
  idCliente?: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  status?: string;

  @IsDateString()
  @IsOptional()
  dataEntrega?: Date;
  
  @IsString()
  @IsOptional()
  enderecoEntrega?: string;

  @IsString()
  @IsOptional()
  observacao?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateItemPedidoDto)
  @IsOptional()
  itens?: UpdateItemPedidoDto[];

  @ValidateNested()
  @Type(() => UpdatePagamentoDto)
  @IsOptional()
  pagamento?: UpdatePagamentoDto;
}