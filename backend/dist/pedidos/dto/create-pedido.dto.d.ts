declare class CreateItemPedidoDto {
    idProduto: number;
    quantidade: number;
    preco: number;
}
declare class CreatePagamentoDto {
    valor: number;
    dataPagamento?: Date;
}
export declare class CreatePedidoDto {
    idCliente: number;
    status?: string;
    dataEntrega: Date;
    enderecoEntrega?: string;
    observacao?: string;
    desconto?: number;
    itens: CreateItemPedidoDto[];
    pagamento: CreatePagamentoDto;
}
export {};
