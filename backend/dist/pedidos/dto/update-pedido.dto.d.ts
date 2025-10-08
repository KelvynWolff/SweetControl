declare class UpdateItemPedidoDto {
    idProduto?: number;
    quantidade?: number;
    preco?: number;
}
declare class UpdatePagamentoDto {
    valor?: number;
    formaPagamento?: string;
}
export declare class UpdatePedidoDto {
    idCliente?: number;
    status?: string;
    dataEntrega?: Date;
    enderecoEntrega?: string;
    observacao?: string;
    itens?: UpdateItemPedidoDto[];
    pagamento?: UpdatePagamentoDto;
}
export {};
