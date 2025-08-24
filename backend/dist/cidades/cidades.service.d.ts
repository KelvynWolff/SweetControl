import { Repository } from 'typeorm';
import { Cidade } from './entities/cidade.entity';
import { CreateCidadeDto } from './dto/create-cidade.dto';
import { UpdateCidadeDto } from './dto/update-cidade.dto';
export declare class CidadesService {
    private readonly cidadeRepository;
    constructor(cidadeRepository: Repository<Cidade>);
    create(createCidadeDto: CreateCidadeDto): Promise<Cidade>;
    findAll(): Promise<Cidade[]>;
    findOne(codigobge: number): Promise<Cidade>;
    update(codigobge: number, updateCidadeDto: UpdateCidadeDto): Promise<Cidade>;
    remove(codigobge: number): Promise<void>;
}
