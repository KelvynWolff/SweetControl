import { Repository } from 'typeorm';
import { Pessoa } from './entities/pessoa.entity';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
export declare class PessoasService {
    private readonly pessoaRepository;
    constructor(pessoaRepository: Repository<Pessoa>);
    create(createPessoaDto: CreatePessoaDto): Promise<Pessoa>;
}
