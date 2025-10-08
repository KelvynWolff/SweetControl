import { PagamentosService } from './pagamentos.service';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
export declare class PagamentosController {
    private readonly pagamentosService;
    constructor(pagamentosService: PagamentosService);
    create(createPagamentoDto: CreatePagamentoDto): Promise<import("./entities/pagamento.entity").Pagamento>;
    findAll(): Promise<import("./entities/pagamento.entity").Pagamento[]>;
}
