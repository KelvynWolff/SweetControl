import { Repository, DataSource } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
export declare class PedidosService {
    private readonly pedidoRepository;
    private dataSource;
    constructor(pedidoRepository: Repository<Pedido>, dataSource: DataSource);
    create(createPedidoDto: CreatePedidoDto): Promise<Pedido>;
    findAll(): Promise<Pedido[]>;
    findOne(id: number): Promise<Pedido>;
    update(id: number, updatePedidoDto: UpdatePedidoDto): Promise<Pedido>;
    remove(id: number): Promise<void>;
    updateStatus(id: number, status: string): Promise<Pedido>;
}
