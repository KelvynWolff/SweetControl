declare class CreateItemPedidoDto {
    idProduto: number;
    quantidade: number;
    preco: number;
}
declare class CreatePagamentoDto {
    valor: number;
    formaPagamento: string;
}
export declare class CreatePedidoDto {
    idCliente: number;
    status: string;
    dataEntrega: Date;
    enderecoEntrega?: string;
    observacao?: string;
    itens: CreateItemPedidoDto[];
    pagamento: CreatePagamentoDto;
}
export {};
