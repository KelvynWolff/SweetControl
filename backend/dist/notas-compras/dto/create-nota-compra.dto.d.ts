declare class CreateItemNotaDto {
    quantidade: number;
    precoCompra: number;
    idProduto?: number;
    idInsumo?: number;
    codigoLote: string;
    dataValidade?: string;
}
export declare class CreateNotaCompraDto {
    chaveAcesso: string;
    idFornecedor: number;
    data: string;
    valorTotal: number;
    itens: CreateItemNotaDto[];
}
export {};
