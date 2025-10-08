import { Repository } from 'typeorm';
import { Pagamento } from './entities/pagamento.entity';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { Pedido } from '../pedidos/entities/pedido.entity';
export declare class PagamentosService {
    private readonly pagamentoRepository;
    private readonly pedidoRepository;
    constructor(pagamentoRepository: Repository<Pagamento>, pedidoRepository: Repository<Pedido>);
    create(createPagamentoDto: CreatePagamentoDto): Promise<Pagamento>;
    findAll(): Promise<Pagamento[]>;
}
