import { Repository } from 'typeorm';
import { Notificacao } from './entities/notificacao.entity';
import { EmailsService } from '../emails/emails.service';
import { CreateNotificacaoDto } from './dto/create-notificacao.dto';
import { UpdateNotificacaoDto } from './dto/update-notificacao.dto';
export declare class NotificacoesService {
    private readonly notificacaoRepository;
    private readonly emailsService;
    constructor(notificacaoRepository: Repository<Notificacao>, emailsService: EmailsService);
    create(createNotificacaoDto: CreateNotificacaoDto): Promise<Notificacao>;
    findAll(): Promise<Notificacao[]>;
    findOne(id: number): Promise<Notificacao | null>;
    markAsRead(id: number, updateNotificacaoDto: UpdateNotificacaoDto): Promise<Notificacao>;
    remove(id: number): Promise<void>;
    criarNotificacaoPedido(pedido: any): Promise<void>;
}
