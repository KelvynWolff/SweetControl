import { Repository } from 'typeorm';
import { Estado } from './entities/estado.entity';
import { Cidade } from './entities/cidade.entity';
import { Bairro } from './entities/bairro.entity';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { CreateCidadeDto } from './dto/create-cidade.dto';
import { CreateBairroDto } from './dto/create-bairro.dto';
export declare class LocalizacaoService {
    private readonly estadoRepository;
    private readonly cidadeRepository;
    private readonly bairroRepository;
    constructor(estadoRepository: Repository<Estado>, cidadeRepository: Repository<Cidade>, bairroRepository: Repository<Bairro>);
    createEstado(createEstadoDto: CreateEstadoDto): Promise<Estado>;
    createCidade(createCidadeDto: CreateCidadeDto): Promise<Cidade>;
    createBairro(createBairroDto: CreateBairroDto): Promise<Bairro>;
}
