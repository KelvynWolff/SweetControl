import { DataSource } from 'typeorm';
import { NotasCompras } from './entities/notas-compras.entity';
import { CreateNotaCompraDto } from './dto/create-nota-compra.dto';
import { FornecedoresService } from '../fornecedores/fornecedores.service';
export declare class NotasComprasService {
    private dataSource;
    private fornecedoresService;
    constructor(dataSource: DataSource, fornecedoresService: FornecedoresService);
    create(createNotaCompraDto: CreateNotaCompraDto): Promise<NotasCompras>;
    processXml(xmlBuffer: Buffer): Promise<any>;
    findAll(): Promise<NotasCompras[]>;
    findOne(id: number): Promise<NotasCompras>;
    remove(id: number): Promise<void>;
}
