import { Repository } from 'typeorm';
import { Endereco } from './entities/endereco.entity';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
export declare class EnderecosService {
    private readonly enderecoRepository;
    constructor(enderecoRepository: Repository<Endereco>);
    create(createEnderecoDto: CreateEnderecoDto): Promise<Endereco>;
    findAll(): Promise<Endereco[]>;
    findOne(id: number): Promise<Endereco>;
    update(id: number, updateEnderecoDto: UpdateEnderecoDto): Promise<Endereco>;
    remove(id: number): Promise<void>;
}
