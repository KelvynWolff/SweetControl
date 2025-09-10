import { IsBoolean } from 'class-validator';

export class UpdateNotificacaoDto {
  @IsBoolean()
  status_leitura: boolean;
}