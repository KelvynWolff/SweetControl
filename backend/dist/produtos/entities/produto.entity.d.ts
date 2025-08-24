import { Promocao } from '../../promocoes/entities/promocao.entity';
import { Receita } from '../../receitas/entities/receita.entity';
import { ItensPedido } from '../../vendas/entities/itens-pedido.entity';
export declare class Produto {
    id: number;
    nome: string;
    preco: number;
    unidadeMedida: string;
    estoque: number;
    custo: number;
    margem: number;
    descricao: string;
    ativo: boolean;
    receitas: Receita[];
    promocoes: Promocao[];
    itensPedido: ItensPedido[];
}
