import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateBairroDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  nome?: string;
}