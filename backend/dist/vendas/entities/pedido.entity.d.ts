import { Cliente } from '../../pessoas/entities/cliente.entity';
import { ItensPedido } from './itens-pedido.entity';
import { Pagamento } from './pagamento.entity';
import { Notificacao } from '../../notificacoes/entities/notificacao.entity';
export declare class Pedido {
    id: number;
    data: Date;
    status: string;
    enderecoEntrega: string;
    observacao: string;
    cliente: Cliente;
    itens: ItensPedido[];
    pagamento: Pagamento;
    notificacoes: Notificacao[];
}
