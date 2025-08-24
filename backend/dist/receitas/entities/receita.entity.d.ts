import { Produto } from '../../produtos/entities/produto.entity';
import { Insumo } from '../../insumos/entities/insumo.entity';
export declare class Receita {
    id: number;
    idProduto: number;
    idInsumo: number;
    qtdInsumo: number;
    produto: Produto;
    insumo: Insumo;
}
