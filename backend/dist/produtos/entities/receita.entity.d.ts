import { Produto } from './produto.entity';
import { Insumo } from './insumo.entity';
export declare class Receita {
    id: number;
    produto: Produto;
    insumo: Insumo;
    qtdInsumo: number;
}
