import { Produto } from '../../produtos/entities/produto.entity';
export declare class Producao {
    id: number;
    data: Date;
    idProduto: number;
    quantidade: number;
    dataValidade: Date;
    observacao: string;
    produto: Produto;
}
