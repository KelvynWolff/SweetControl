import { LotesService } from './lotes.service';
import { CreateLoteDto } from './dto/create-lote.dto';
import { UpdateLoteDto } from './dto/update-lote.dto';
export declare class LotesController {
    private readonly lotesService;
    constructor(lotesService: LotesService);
    create(createLoteDto: CreateLoteDto): Promise<import("./entities/lote.entity").Lote>;
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<import("./entities/lote.entity").Lote>;
    update(id: number, updateLoteDto: UpdateLoteDto): Promise<import("./entities/lote.entity").Lote>;
    remove(id: number): Promise<void>;
}
