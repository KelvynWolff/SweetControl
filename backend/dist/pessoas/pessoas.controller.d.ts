import { PessoasService } from './pessoa.service';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
export declare class PessoasController {
    private readonly pessoasService;
    constructor(pessoasService: PessoasService);
    create(createPessoaDto: CreatePessoaDto): Promise<import("./entities/pessoa.entity").Pessoa>;
}
