import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, ValidateNested, IsInt, IsDateString, IsOptional } from 'class-validator';

class CreateItemPedidoDto {
  @IsInt()
  @IsPositive()
  idProduto: number;

  @IsNumber()
  @IsPositive()
  quantidade: number;

  @IsNumber()
  @IsPositive()
  preco: number;
}

class CreatePagamentoDto {
  @IsNumber()
  @IsPositive()
  valor: number;

  @IsDateString()
  @IsOptional()
  dataPagamento?: Date;
}

export class CreatePedidoDto {
  @IsInt()
  @IsPositive()
  idCliente: number;

  @IsString()
  @IsOptional()
  status?: string;

  @IsDateString()
  dataEntrega: Date;
  
  @IsString()
  @IsOptional()
  enderecoEntrega?: string;

  @IsString()
  @IsOptional()
  observacao?: string;

  @IsNumber()
  @IsOptional()
  desconto?: number; 

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateItemPedidoDto)
  itens: CreateItemPedidoDto[];

  @ValidateNested()
  @Type(() => CreatePagamentoDto)
  pagamento: CreatePagamentoDto;
}