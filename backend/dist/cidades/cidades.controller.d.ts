import { CidadesService } from './cidades.service';
import { CreateCidadeDto } from './dto/create-cidade.dto';
import { UpdateCidadeDto } from './dto/update-cidade.dto';
export declare class CidadesController {
    private readonly cidadesService;
    constructor(cidadesService: CidadesService);
    create(createCidadeDto: CreateCidadeDto): Promise<import("./entities/cidade.entity").Cidade>;
    findAll(): Promise<import("./entities/cidade.entity").Cidade[]>;
    findOne(codigobge: number): Promise<import("./entities/cidade.entity").Cidade>;
    update(codigobge: number, updateCidadeDto: UpdateCidadeDto): Promise<import("./entities/cidade.entity").Cidade>;
    remove(codigobge: number): Promise<void>;
}
