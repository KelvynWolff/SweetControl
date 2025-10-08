import { Repository, DataSource } from 'typeorm';
import { Producao } from './entities/producao.entity';
import { CreateProducaoDto } from './dto/create-producao.dto';
export declare class ProducaoService {
    private readonly producaoRepository;
    private dataSource;
    constructor(producaoRepository: Repository<Producao>, dataSource: DataSource);
    create(createProducaoDto: CreateProducaoDto): Promise<Producao>;
    findAll(): Promise<Producao[]>;
    private calcularEstoqueItem;
    private registrarSaidaEstoque;
}
