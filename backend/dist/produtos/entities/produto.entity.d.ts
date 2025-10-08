import { Receita } from '../../receitas/entities/receita.entity';
import { Lote } from '../../lotes/entities/lote.entity';
export declare class Produto {
    id: number;
    nome: string;
    preco: number;
    unidadeMedida: string;
    custo: number;
    margem: number;
    descricao: string;
    ativo: boolean;
    receitas: Receita[];
    lotes: Lote[];
}
