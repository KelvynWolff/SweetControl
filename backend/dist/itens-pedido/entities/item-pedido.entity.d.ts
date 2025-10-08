import { Pedido } from '../../pedidos/entities/pedido.entity';
import { Produto } from '../../produtos/entities/produto.entity';
import { Lote } from '../../lotes/entities/lote.entity';
export declare class ItemPedido {
    id: number;
    idPedido: number;
    idProduto: number;
    quantidade: number;
    preco: number;
    desconto: number;
    pedido: Pedido;
    produto: Produto;
    idLote: number;
    lote: Lote;
}
