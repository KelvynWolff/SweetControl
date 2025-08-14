import { NotificacoesService } from './notificacoes.service';
import { CreateNotificacaoDto } from './dto/create-notificacao.dto';
export declare class NotificacoesController {
    private readonly notificacoesService;
    constructor(notificacoesService: NotificacoesService);
    create(createNotificacaoDto: CreateNotificacaoDto): Promise<import("./entities/notificacao.entity").Notificacao>;
}
