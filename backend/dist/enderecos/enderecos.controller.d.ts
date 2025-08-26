import { EnderecosService } from './enderecos.service';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
export declare class EnderecosController {
    private readonly enderecosService;
    constructor(enderecosService: EnderecosService);
    create(createEnderecoDto: CreateEnderecoDto): Promise<import("./entities/endereco.entity").Endereco>;
    findAll(): Promise<import("./entities/endereco.entity").Endereco[]>;
    findOne(id: number): Promise<import("./entities/endereco.entity").Endereco>;
    update(id: number, updateEnderecoDto: UpdateEnderecoDto): Promise<import("./entities/endereco.entity").Endereco>;
    remove(id: number): Promise<void>;
}
