import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { NotificacoesService } from 'src/notificacoes/notificacoes.service';
export declare class PedidosController {
    private readonly pedidosService;
    private readonly notificacoesService;
    constructor(pedidosService: PedidosService, notificacoesService: NotificacoesService);
    create(createPedidoDto: CreatePedidoDto): Promise<import("./entities/pedido.entity").Pedido>;
    findAll(): Promise<import("./entities/pedido.entity").Pedido[]>;
    findOne(id: number): Promise<import("./entities/pedido.entity").Pedido>;
    updateStatus(id: number, updatePedidoDto: UpdatePedidoDto): Promise<import("./entities/pedido.entity").Pedido>;
    remove(id: number): Promise<void>;
    enviarEmailConfirmacao(id: number): Promise<{
        message: string;
    }>;
}
