import { Repository } from 'typeorm';
import { Notificacao } from './entities/notificacao.entity';
import { CreateNotificacaoDto } from './dto/create-notificacao.dto';
export declare class NotificacoesService {
    private readonly notificacaoRepository;
    constructor(notificacaoRepository: Repository<Notificacao>);
    create(createNotificacaoDto: CreateNotificacaoDto): Promise<Notificacao>;
}
