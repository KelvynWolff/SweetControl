import { Repository, DataSource } from 'typeorm';
import { Fornecedor } from './entities/fornecedor.entity';
import { Pessoa } from '../pessoas/entities/pessoa.entity';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';
export declare class FornecedoresService {
    private readonly fornecedorRepository;
    private readonly pessoaRepository;
    private dataSource;
    constructor(fornecedorRepository: Repository<Fornecedor>, pessoaRepository: Repository<Pessoa>, dataSource: DataSource);
    create(createFornecedorDto: CreateFornecedorDto): Promise<Fornecedor>;
    findAll(): Promise<Fornecedor[]>;
    findOne(id: number): Promise<Fornecedor>;
    update(id: number, updateFornecedorDto: UpdateFornecedorDto): Promise<Fornecedor>;
    remove(id: number): Promise<void>;
}
