import { Pedido } from './pedido.entity';
export declare class Pagamento {
    id: number;
    valor: number;
    formaPagamento: string;
    pedido: Pedido;
}
