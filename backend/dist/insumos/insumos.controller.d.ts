import { InsumosService } from './insumos.service';
import { CreateInsumoDto } from './dto/create-insumo.dto';
import { UpdateInsumoDto } from './dto/update-insumo.dto';
export declare class InsumosController {
    private readonly insumosService;
    constructor(insumosService: InsumosService);
    create(createInsumoDto: CreateInsumoDto): Promise<import("./entities/insumo.entity").Insumo>;
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any>;
    update(id: number, updateInsumoDto: UpdateInsumoDto): Promise<import("./entities/insumo.entity").Insumo>;
    remove(id: number): Promise<void>;
}
