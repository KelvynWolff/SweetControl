import { Cidade } from './cidade.entity';
import { Endereco } from '../../pessoas/entities/endereco.entity';
export declare class Bairro {
    id: number;
    nome: string;
    cidade: Cidade;
    enderecos: Endereco[];
}
