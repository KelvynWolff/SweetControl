import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePedidoDto {
  @IsNumber()
  @IsNotEmpty()
  idCliente: number;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  enderecoEntrega: string;
  
  @IsString()
  observacao: string;
}