import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateCidadeDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  nome?: string;
}