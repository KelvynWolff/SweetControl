import { FuncionariosService } from './funcionarios.service';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
export declare class FuncionariosController {
    private readonly funcionariosService;
    constructor(funcionariosService: FuncionariosService);
    create(createFuncionarioDto: CreateFuncionarioDto): Promise<import("./entities/funcionario.entity").Funcionario>;
    findAll(): Promise<import("./entities/funcionario.entity").Funcionario[]>;
    findOne(id: number): Promise<import("./entities/funcionario.entity").Funcionario>;
    update(id: number, updateFuncionarioDto: UpdateFuncionarioDto): Promise<import("./entities/funcionario.entity").Funcionario>;
    remove(id: number): Promise<void>;
}
