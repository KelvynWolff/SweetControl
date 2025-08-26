import { FornecedoresService } from './fornecedores.service';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';
export declare class FornecedoresController {
    private readonly fornecedoresService;
    constructor(fornecedoresService: FornecedoresService);
    create(createFornecedorDto: CreateFornecedorDto): Promise<import("./entities/fornecedor.entity").Fornecedor>;
    findAll(): Promise<import("./entities/fornecedor.entity").Fornecedor[]>;
    findOne(id: number): Promise<import("./entities/fornecedor.entity").Fornecedor>;
    update(id: number, updateFornecedorDto: UpdateFornecedorDto): Promise<import("./entities/fornecedor.entity").Fornecedor>;
    remove(id: number): Promise<void>;
}
