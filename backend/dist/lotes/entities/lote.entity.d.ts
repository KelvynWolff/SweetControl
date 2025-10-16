import { Produto } from '../../produtos/entities/produto.entity';
import { Insumo } from '../../insumos/entities/insumo.entity';
import { MovimentacaoEstoque } from '../../movimentacao-estoque/entities/movimentacao-estoque.entity';
export declare class Lote {
    id: number;
    codigoLote: string;
    dataValidade: Date;
    custoUnitario: number;
    idProduto: number | null;
    idInsumo: number | null;
    produto: Produto;
    insumo: Insumo;
    movimentacoes: MovimentacaoEstoque[];
}
