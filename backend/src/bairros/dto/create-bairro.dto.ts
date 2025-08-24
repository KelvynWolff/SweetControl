import { IsNotEmpty, IsString, IsInt, IsPositive } from 'class-validator';

export class CreateBairroDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsInt()
  @IsPositive()
  ibgeCidade: number;
}