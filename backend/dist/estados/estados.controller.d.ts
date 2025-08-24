import { EstadosService } from './estados.service';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';
export declare class EstadosController {
    private readonly estadosService;
    constructor(estadosService: EstadosService);
    create(createEstadoDto: CreateEstadoDto): Promise<import("./entities/estado.entity").Estado>;
    findAll(): Promise<import("./entities/estado.entity").Estado[]>;
    findOne(sigla: string): Promise<import("./entities/estado.entity").Estado>;
    update(sigla: string, updateEstadoDto: UpdateEstadoDto): Promise<import("./entities/estado.entity").Estado>;
    remove(sigla: string): Promise<void>;
}
