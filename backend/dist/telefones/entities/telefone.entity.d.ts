import { Pessoa } from '../../pessoas/entities/pessoa.entity';
export declare class Telefone {
    id: number;
    numero: string;
    observacao: string;
    idPessoa: number;
    pessoa: Pessoa;
}
