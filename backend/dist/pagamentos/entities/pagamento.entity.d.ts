import { Pedido } from '../../pedidos/entities/pedido.entity';
export declare class Pagamento {
    id: number;
    idPedido: number;
    valor: number;
    formaPagamento: string;
    pedido: Pedido;
}
