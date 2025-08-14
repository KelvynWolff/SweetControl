import { LocalizacaoService } from './localizacao.service';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { CreateCidadeDto } from './dto/create-cidade.dto';
import { CreateBairroDto } from './dto/create-bairro.dto';
export declare class LocalizacaoController {
    private readonly localizacaoService;
    constructor(localizacaoService: LocalizacaoService);
    createEstado(createEstadoDto: CreateEstadoDto): Promise<import("./entities/estado.entity").Estado>;
    createCidade(createCidadeDto: CreateCidadeDto): Promise<import("./entities/cidade.entity").Cidade>;
    createBairro(createBairroDto: CreateBairroDto): Promise<import("./entities/bairro.entity").Bairro>;
}
