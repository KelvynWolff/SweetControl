import { Pessoa } from '../../pessoas/entities/pessoa.entity';
export declare class Funcionario {
    id: number;
    idPessoa: number;
    dataAdmissao: Date;
    dataRecisao: Date | null;
    pessoa: Pessoa;
}
