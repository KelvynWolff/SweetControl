import { Bairro } from '../../localizacao/entities/bairro.entity';
import { Pessoa } from './pessoa.entity';
export declare class Endereco {
    id: number;
    rua: string;
    numero: string;
    cep: string;
    pessoa: Pessoa;
    bairro: Bairro;
}
