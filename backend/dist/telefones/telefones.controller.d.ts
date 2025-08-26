import { TelefonesService } from './telefones.service';
import { CreateTelefoneDto } from './dto/create-telefone.dto';
import { UpdateTelefoneDto } from './dto/update-telefone.dto';
export declare class TelefonesController {
    private readonly telefonesService;
    constructor(telefonesService: TelefonesService);
    create(createTelefoneDto: CreateTelefoneDto): Promise<import("./entities/telefone.entity").Telefone>;
    findAll(): Promise<import("./entities/telefone.entity").Telefone[]>;
    findOne(id: number): Promise<import("./entities/telefone.entity").Telefone>;
    update(id: number, updateTelefoneDto: UpdateTelefoneDto): Promise<import("./entities/telefone.entity").Telefone>;
    remove(id: number): Promise<void>;
}
