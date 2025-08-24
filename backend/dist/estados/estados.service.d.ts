import { Repository } from 'typeorm';
import { Estado } from './entities/estado.entity';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';
export declare class EstadosService {
    private readonly estadoRepository;
    constructor(estadoRepository: Repository<Estado>);
    create(createEstadoDto: CreateEstadoDto): Promise<Estado>;
    findAll(): Promise<Estado[]>;
    findOne(sigla: string): Promise<Estado>;
    update(sigla: string, updateEstadoDto: UpdateEstadoDto): Promise<Estado>;
    remove(sigla: string): Promise<void>;
}
