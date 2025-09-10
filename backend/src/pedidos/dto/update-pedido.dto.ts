import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdatePedidoDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  status?: string;
}