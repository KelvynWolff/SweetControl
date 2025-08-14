import { Cliente } from '../../pessoas/entities/cliente.entity';
import { Produto } from '../../produtos/entities/produto.entity';
export declare class Producao {
    id: number;
    data: Date;
    producaoEstoque: boolean;
    quantidade: number;
    dataValidade: Date;
    observacao: string;
    cliente: Cliente;
    produto: Produto;
}
