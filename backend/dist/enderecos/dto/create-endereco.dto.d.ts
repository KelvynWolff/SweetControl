export declare class CreateEnderecoDto {
    rua: string;
    numero: string;
    CEP: string;
    idBairro: number;
    idCidade: number;
    idPessoa: number;
}
declare class CreateTelefoneDto {
    numero: string;
}
declare class CreateEmailDto {
    email: string;
}
export declare class CreateFornecedorDto {
    nome: string;
    cpfCnpj: string;
    endereco: CreateEnderecoDto;
    telefones: CreateTelefoneDto[];
    emails: CreateEmailDto[];
}
export {};
