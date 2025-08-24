import { PartialType } from '@nestjs/mapped-types';
import { CreateEstadoDto } from './create-estado.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateEstadoDto extends PartialType(CreateEstadoDto) {
  @IsString()
  @IsNotEmpty()
  nome?: string;
}