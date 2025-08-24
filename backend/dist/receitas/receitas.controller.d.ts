import { ReceitasService } from './receitas.service';
import { CreateReceitaDto } from './dto/create-receita.dto';
import { UpdateReceitaDto } from './dto/update-receita.dto';
export declare class ReceitasController {
    private readonly receitasService;
    constructor(receitasService: ReceitasService);
    create(createReceitaDto: CreateReceitaDto): Promise<import("./entities/receita.entity").Receita>;
    findAll(): Promise<import("./entities/receita.entity").Receita[]>;
    findOne(id: number): Promise<import("./entities/receita.entity").Receita>;
    update(id: number, updateReceitaDto: UpdateReceitaDto): Promise<import("./entities/receita.entity").Receita>;
    remove(id: number): Promise<void>;
}
