declare class CreateEnderecoDto {
    rua: string;
    numero: string;
    CEP: string;
    idBairro: number;
    idCidade: number;
}
declare class CreateTelefoneDto {
    numero: string;
}
declare class CreateEmailDto {
    email: string;
}
export declare class CreateFuncionarioDto {
    nome: string;
    cpfCnpj: string;
    dataAdmissao: Date;
    endereco: CreateEnderecoDto;
    telefones: CreateTelefoneDto[];
    emails: CreateEmailDto[];
}
export {};
