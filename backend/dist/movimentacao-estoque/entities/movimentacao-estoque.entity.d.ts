import { Lote } from '../../lotes/entities/lote.entity';
export declare enum TipoMovimentacao {
    ENTRADA_COMPRA = "ENTRADA_COMPRA",
    ENTRADA_PRODUCAO = "ENTRADA_PRODUCAO",
    ENTRADA_DEVOLUCAO = "ENTRADA_DEVOLUCAO",
    SAIDA_VENDA = "SAIDA_VENDA",
    SAIDA_PRODUCAO = "SAIDA_PRODUCAO",
    PERDA = "PERDA"
}
export declare class MovimentacaoEstoque {
    id: number;
    idLote: number;
    data: Date;
    tipo: TipoMovimentacao;
    quantidade: number;
    lote: Lote;
}
