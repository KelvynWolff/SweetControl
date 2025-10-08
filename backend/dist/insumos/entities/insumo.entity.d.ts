import { Lote } from '../../lotes/entities/lote.entity';
import { Receita } from '../../receitas/entities/receita.entity';
export declare class Insumo {
    id: number;
    nome: string;
    valor: number;
    unidadeMedida: string;
    lotes: Lote[];
    receitas: Receita[];
}
