import { Repository } from 'typeorm';
import { Telefone } from './entities/telefone.entity';
import { CreateTelefoneDto } from './dto/create-telefone.dto';
import { UpdateTelefoneDto } from './dto/update-telefone.dto';
export declare class TelefonesService {
    private readonly telefoneRepository;
    constructor(telefoneRepository: Repository<Telefone>);
    create(createTelefoneDto: CreateTelefoneDto): Promise<Telefone>;
    findAll(): Promise<Telefone[]>;
    findOne(id: number): Promise<Telefone>;
    update(id: number, updateTelefoneDto: UpdateTelefoneDto): Promise<Telefone>;
    remove(id: number): Promise<void>;
}
