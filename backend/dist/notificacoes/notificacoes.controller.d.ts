import { NotificacoesService } from './notificacoes.service';
import { CreateNotificacaoDto } from './dto/create-notificacao.dto';
import { UpdateNotificacaoDto } from './dto/update-notificacao.dto';
export declare class NotificacoesController {
    private readonly notificacoesService;
    constructor(notificacoesService: NotificacoesService);
    create(createNotificacaoDto: CreateNotificacaoDto): Promise<import("./entities/notificacao.entity").Notificacao>;
    findAll(): Promise<import("./entities/notificacao.entity").Notificacao[]>;
    markAsRead(id: number, updateNotificacaoDto: UpdateNotificacaoDto): Promise<import("./entities/notificacao.entity").Notificacao>;
    remove(id: number): Promise<void>;
}
