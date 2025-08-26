import { Repository, DataSource } from 'typeorm';
import { Funcionario } from './entities/funcionario.entity';
import { Pessoa } from '../pessoas/entities/pessoa.entity';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
export declare class FuncionariosService {
    private readonly funcionarioRepository;
    private readonly pessoaRepository;
    private dataSource;
    constructor(funcionarioRepository: Repository<Funcionario>, pessoaRepository: Repository<Pessoa>, dataSource: DataSource);
    create(createFuncionarioDto: CreateFuncionarioDto): Promise<Funcionario>;
    findAll(): Promise<Funcionario[]>;
    findOne(id: number): Promise<Funcionario>;
    update(id: number, updateFuncionarioDto: UpdateFuncionarioDto): Promise<Funcionario>;
    remove(id: number): Promise<void>;
}
