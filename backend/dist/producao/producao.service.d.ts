import { Repository } from 'typeorm';
import { Producao } from './entities/producao.entity';
import { CreateProducaoDto } from './dto/create-producao.dto';
export declare class ProducaoService {
    private readonly producaoRepository;
    constructor(producaoRepository: Repository<Producao>);
    create(createProducaoDto: CreateProducaoDto): Promise<Producao>;
}
