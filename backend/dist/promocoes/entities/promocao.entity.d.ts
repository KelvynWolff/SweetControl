import { Produto } from '../../produtos/entities/produto.entity';
export declare class Promocao {
    id: number;
    nome: string;
    tipoDeDesconto: string;
    valor: number;
    dataInicio: Date;
    dataFim: Date;
    idProduto: number;
    produto: Produto;
}
