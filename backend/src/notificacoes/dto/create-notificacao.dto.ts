import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateNotificacaoDto {
  @IsString()
  @IsNotEmpty()
  mensagem: string;

  @IsNumber()
  @IsNotEmpty()
  idPedido: number;
}