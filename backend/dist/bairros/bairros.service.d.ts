import { Repository } from 'typeorm';
import { Bairro } from './entities/bairro.entity';
import { CreateBairroDto } from './dto/create-bairro.dto';
import { UpdateBairroDto } from './dto/update-bairro.dto';
export declare class BairrosService {
    private readonly bairroRepository;
    constructor(bairroRepository: Repository<Bairro>);
    create(createBairroDto: CreateBairroDto): Promise<Bairro>;
    findAll(): Promise<Bairro[]>;
    findAllByCidade(cidadeId: number): Promise<Bairro[]>;
    findOne(id: number): Promise<Bairro>;
    update(id: number, updateBairroDto: UpdateBairroDto): Promise<Bairro>;
    remove(id: number): Promise<void>;
}
