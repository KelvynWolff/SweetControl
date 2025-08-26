declare class CreateEnderecoDto {
    rua: string;
    numero: string;
    CEP: string;
    idBairro: number;
    idCidade: number;
}
declare class CreateTelefoneDto {
    numero: string;
    observacao?: string;
}
declare class CreateEmailDto {
    email: string;
    observacao?: string;
}
export declare class CreateClienteDto {
    nome: string;
    cpfCnpj: string;
    endereco: CreateEnderecoDto;
    telefones: CreateTelefoneDto[];
    emails: CreateEmailDto[];
}
export {};
