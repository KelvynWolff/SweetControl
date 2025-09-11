import { PromocoesService } from './promocoes.service';
import { CreatePromocaoDto } from './dto/create-promocao.dto';
import { UpdatePromocaoDto } from './dto/update-promocao.dto';
export declare class PromocoesController {
    private readonly promocoesService;
    constructor(promocoesService: PromocoesService);
    create(createPromocaoDto: CreatePromocaoDto): Promise<import("./entities/promocao.entity").Promocao>;
    findAtivas(): Promise<import("./entities/promocao.entity").Promocao[]>;
    findAll(): Promise<import("./entities/promocao.entity").Promocao[]>;
    findOne(id: number): Promise<import("./entities/promocao.entity").Promocao>;
    update(id: number, updatePromocaoDto: UpdatePromocaoDto): Promise<import("./entities/promocao.entity").Promocao>;
    remove(id: number): Promise<void>;
}
