import { Cliente } from '../../clientes/entities/cliente.entity';
import { ItemPedido } from '../../itens-pedido/entities/item-pedido.entity';
import { Pagamento } from '../../pagamentos/entities/pagamento.entity';
export declare class Pedido {
    id: number;
    data: Date;
    idCliente: number;
    status: string;
    dataEntrega: Date;
    enderecoEntrega: string;
    observacao: string;
    cliente: Cliente;
    itens: ItemPedido[];
    pagamentos: Pagamento[];
}
