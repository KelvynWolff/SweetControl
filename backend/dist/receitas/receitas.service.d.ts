import { Repository } from 'typeorm';
import { Receita } from './entities/receita.entity';
import { CreateReceitaDto } from './dto/create-receita.dto';
import { UpdateReceitaDto } from './dto/update-receita.dto';
export declare class ReceitasService {
    private readonly receitaRepository;
    constructor(receitaRepository: Repository<Receita>);
    create(createReceitaDto: CreateReceitaDto): Promise<Receita>;
    findAll(): Promise<Receita[]>;
    findOne(id: number): Promise<Receita>;
    update(id: number, updateReceitaDto: UpdateReceitaDto): Promise<Receita>;
    remove(id: number): Promise<void>;
}
