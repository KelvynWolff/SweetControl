import { ProducaoService } from './producao.service';
import { CreateProducaoDto } from './dto/create-producao.dto';
export declare class ProducaoController {
    private readonly producaoService;
    constructor(producaoService: ProducaoService);
    create(createProducaoDto: CreateProducaoDto): Promise<import("./entities/producao.entity").Producao>;
    findAll(): Promise<import("./entities/producao.entity").Producao[]>;
}
