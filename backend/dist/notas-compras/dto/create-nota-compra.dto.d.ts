declare class CreateItemNotaDto {
    quantidade: number;
    idProduto?: number;
    idInsumo?: number;
    codigoLote: number;
    dataValidade: Date;
}
export declare class CreateNotaCompraDto {
    chaveAcesso: string;
    idFornecedor: number;
    data: Date;
    valorTotal: number;
    itens: CreateItemNotaDto[];
}
export {};
