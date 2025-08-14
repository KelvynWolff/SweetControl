import { Bairro } from './bairro.entity';
import { Estado } from './estado.entity';
export declare class Cidade {
    id: number;
    codigoIbge: number;
    nome: string;
    estado: Estado;
    bairros: Bairro[];
}
