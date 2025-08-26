import { BairrosService } from './bairros.service';
import { CreateBairroDto } from './dto/create-bairro.dto';
import { UpdateBairroDto } from './dto/update-bairro.dto';
export declare class BairrosController {
    private readonly bairrosService;
    constructor(bairrosService: BairrosService);
    create(createBairroDto: CreateBairroDto): Promise<import("./entities/bairro.entity").Bairro>;
    findAll(): Promise<import("./entities/bairro.entity").Bairro[]>;
    findOne(id: number): Promise<import("./entities/bairro.entity").Bairro>;
    findAllByCidade(cidadeId: number): Promise<import("./entities/bairro.entity").Bairro[]>;
    update(id: number, updateBairroDto: UpdateBairroDto): Promise<import("./entities/bairro.entity").Bairro>;
    remove(id: number): Promise<void>;
}
