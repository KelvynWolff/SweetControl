declare class UpdateEnderecoDto {
    rua?: string;
    numero?: string;
    CEP?: string;
    idBairro?: number;
    idCidade?: number;
}
declare class UpdateTelefoneDto {
    numero?: string;
}
declare class UpdateEmailDto {
    email?: string;
}
export declare class UpdateClienteDto {
    nome?: string;
    cpfCnpj?: string;
    endereco?: UpdateEnderecoDto;
    telefones?: UpdateTelefoneDto[];
    emails?: UpdateEmailDto[];
}
export {};
