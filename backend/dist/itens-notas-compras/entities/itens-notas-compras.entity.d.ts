import { NotasCompras } from '../../notas-compras/entities/notas-compras.entity';
import { Produto } from '../../produtos/entities/produto.entity';
import { Insumo } from '../../insumos/entities/insumo.entity';
import { Lote } from 'src/lotes/entities/lote.entity';
export declare class ItensNotasCompras {
    id: number;
    idNotasCompras: number;
    idProduto: number | null;
    idInsumo: number | null;
    idLote: number | null;
    quantidade: number;
    notaCompra: NotasCompras;
    produto: Produto;
    insumo: Insumo;
    lote: Lote;
}
