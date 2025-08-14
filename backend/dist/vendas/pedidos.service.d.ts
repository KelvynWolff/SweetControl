import { Repository } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
export declare class PedidosService {
    private readonly pedidoRepository;
    constructor(pedidoRepository: Repository<Pedido>);
    create(createPedidoDto: CreatePedidoDto): Promise<Pedido>;
}
