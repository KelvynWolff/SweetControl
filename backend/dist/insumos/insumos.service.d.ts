import { Repository } from 'typeorm';
import { Insumo } from './entities/insumo.entity';
import { CreateInsumoDto } from './dto/create-insumo.dto';
import { UpdateInsumoDto } from './dto/update-insumo.dto';
export declare class InsumosService {
    private readonly insumoRepository;
    constructor(insumoRepository: Repository<Insumo>);
    create(createInsumoDto: CreateInsumoDto): Promise<Insumo>;
    findAll(): Promise<Insumo[]>;
    findOne(id: number): Promise<Insumo>;
    update(id: number, updateInsumoDto: UpdateInsumoDto): Promise<Insumo>;
    remove(id: number): Promise<void>;
}
