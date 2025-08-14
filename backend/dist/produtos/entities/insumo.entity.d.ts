import { Receita } from './receita.entity';
export declare class Insumo {
    id: number;
    nome: string;
    valor: number;
    unidadeMedida: string;
    estoque: number;
    receitas: Receita[];
}
