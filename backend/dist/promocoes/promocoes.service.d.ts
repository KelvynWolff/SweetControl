import { Repository } from 'typeorm';
import { Promocao } from './entities/promocao.entity';
import { CreatePromocaoDto } from './dto/create-promocao.dto';
import { UpdatePromocaoDto } from './dto/update-promocao.dto';
export declare class PromocoesService {
    private readonly promocaoRepository;
    constructor(promocaoRepository: Repository<Promocao>);
    create(createPromocaoDto: CreatePromocaoDto): Promise<Promocao>;
    findAll(): Promise<Promocao[]>;
    findOne(id: number): Promise<Promocao>;
    update(id: number, updatePromocaoDto: UpdatePromocaoDto): Promise<Promocao>;
    remove(id: number): Promise<void>;
    findAtivas(): Promise<Promocao[]>;
}
