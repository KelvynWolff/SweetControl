import { Produto } from './produto.entity';
export declare class Promocao {
    id: number;
    valor: number;
    dataInicio: Date;
    dataFim: Date;
    produto: Produto;
}
