import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';

export class CreateNotificacaoDto {
  @IsString()
  @IsNotEmpty()
  mensagem: string;

  @IsInt()
  @IsOptional()
  idPedido?: number;
}