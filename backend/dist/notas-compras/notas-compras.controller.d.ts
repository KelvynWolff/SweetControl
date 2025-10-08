import { NotasComprasService } from './notas-compras.service';
import { CreateNotaCompraDto } from './dto/create-nota-compra.dto';
export declare class NotasComprasController {
    private readonly notasComprasService;
    constructor(notasComprasService: NotasComprasService);
    create(createNotaCompraDto: CreateNotaCompraDto): Promise<import("./entities/notas-compras.entity").NotasCompras>;
    findAll(): Promise<import("./entities/notas-compras.entity").NotasCompras[]>;
}
