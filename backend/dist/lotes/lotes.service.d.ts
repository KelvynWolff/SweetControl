import { Repository, DataSource } from 'typeorm';
import { Lote } from './entities/lote.entity';
import { CreateLoteDto } from './dto/create-lote.dto';
import { UpdateLoteDto } from './dto/update-lote.dto';
export declare class LotesService {
    private readonly loteRepository;
    private dataSource;
    constructor(loteRepository: Repository<Lote>, dataSource: DataSource);
    create(createLoteDto: CreateLoteDto): Promise<Lote>;
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<Lote>;
    update(id: number, updateLoteDto: UpdateLoteDto): Promise<Lote>;
    remove(id: number): Promise<void>;
}
