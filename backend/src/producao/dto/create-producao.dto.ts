import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateProducaoDto {
    @IsDateString()
    @IsNotEmpty()
    dataValidade: string;

    @IsNumber()
    @IsPositive()
    quantidade: number;

    @IsBoolean()
    @IsOptional()
    producaoEstoque?: boolean;

    @IsString()
    @IsOptional()
    observacao?: string;

    @IsNumber()
    @IsNotEmpty()
    idCliente: number;

    @IsNumber()
    @IsNotEmpty()
    idProduto: number;
}