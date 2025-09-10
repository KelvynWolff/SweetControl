import { Repository } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
export declare class PedidosService {
    private readonly pedidoRepository;
    constructor(pedidoRepository: Repository<Pedido>);
    create(createPedidoDto: CreatePedidoDto): Promise<Pedido>;
    findAll(): Promise<Pedido[]>;
    findOne(id: number): Promise<Pedido>;
    updateStatus(id: number, status: string): Promise<Pedido>;
    remove(id: number): Promise<void>;
}
