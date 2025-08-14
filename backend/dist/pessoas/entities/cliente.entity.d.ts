import { Pessoa } from './pessoa.entity';
import { Pedido } from '../../vendas/entities/pedido.entity';
import { Producao } from '../../producao/entities/producao.entity';
export declare class Cliente {
    id: number;
    pessoa: Pessoa;
    pedidos: Pedido[];
    producoes: Producao[];
}
