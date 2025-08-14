import { Pedido } from '../../vendas/entities/pedido.entity';
export declare class Notificacao {
    id: number;
    mensagem: string;
    data: Date;
    status_leitura: boolean;
    pedido: Pedido;
}
