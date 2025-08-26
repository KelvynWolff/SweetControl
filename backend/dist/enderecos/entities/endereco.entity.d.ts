import { Pessoa } from '../../pessoas/entities/pessoa.entity';
import { Bairro } from '../../bairros/entities/bairro.entity';
export declare class Endereco {
    id: number;
    rua: string;
    numero: string;
    CEP: string;
    idBairro: number;
    idPessoa: number;
    pessoa: Pessoa;
    bairro: Bairro;
}
