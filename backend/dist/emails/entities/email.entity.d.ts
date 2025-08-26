import { Pessoa } from '../../pessoas/entities/pessoa.entity';
export declare class Email {
    id: number;
    email: string;
    observacao: string;
    idPessoa: number;
    pessoa: Pessoa;
}
