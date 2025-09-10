import { Pedido } from '../../pedidos/entities/pedido.entity';
export declare class Notificacao {
    id: number;
    idPedido: number;
    mensagem: string;
    data: Date;
    status_leitura: boolean;
    pedido: Pedido;
}
