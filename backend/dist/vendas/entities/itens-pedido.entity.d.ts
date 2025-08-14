import { Pedido } from './pedido.entity';
import { Produto } from '../../produtos/entities/produto.entity';
export declare class ItensPedido {
    id: number;
    quantidade: number;
    preco: number;
    pedido: Pedido;
    produto: Produto;
}
