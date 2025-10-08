import { Fornecedor } from '../../fornecedores/entities/fornecedor.entity';
import { ItensNotasCompras } from '../../itens-notas-compras/entities/itens-notas-compras.entity';
export declare class NotasCompras {
    id: number;
    chaveAcesso: string;
    idFornecedor: number;
    data: Date;
    valorTotal: number;
    xmlArquivo: string;
    fornecedor: Fornecedor;
    itens: ItensNotasCompras[];
}
