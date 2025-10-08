import { DataSource } from 'typeorm';
import { NotasCompras } from './entities/notas-compras.entity';
import { CreateNotaCompraDto } from './dto/create-nota-compra.dto';
export declare class NotasComprasService {
    private dataSource;
    constructor(dataSource: DataSource);
    create(createNotaCompraDto: CreateNotaCompraDto): Promise<NotasCompras>;
    findAll(): Promise<NotasCompras[]>;
}
