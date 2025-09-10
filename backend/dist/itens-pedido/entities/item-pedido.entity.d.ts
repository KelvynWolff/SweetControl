import { Pedido } from '../../pedidos/entities/pedido.entity';
import { Produto } from '../../produtos/entities/produto.entity';
export declare class ItemPedido {
    id: number;
    idPedido: number;
    idProduto: number;
    quantidade: number;
    preco: number;
    pedido: Pedido;
    produto: Produto;
}
