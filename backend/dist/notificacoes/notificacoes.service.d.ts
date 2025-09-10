import { Repository } from 'typeorm';
import { Notificacao } from './entities/notificacao.entity';
import { CreateNotificacaoDto } from './dto/create-notificacao.dto';
import { UpdateNotificacaoDto } from './dto/update-notificacao.dto';
import { EmailsService } from '../emails/emails.service';
import { Pedido } from '../pedidos/entities/pedido.entity';
export declare class NotificacoesService {
    private readonly notificacaoRepository;
    private readonly emailService;
    constructor(notificacaoRepository: Repository<Notificacao>, emailService: EmailsService);
    create(createNotificacaoDto: CreateNotificacaoDto): Promise<Notificacao>;
    criarEEnviarNotificacaoDePedido(pedido: Pedido): Promise<Notificacao>;
    findAll(): Promise<Notificacao[]>;
    markAsRead(id: number, updateNotificacaoDto: UpdateNotificacaoDto): Promise<Notificacao>;
    remove(id: number): Promise<void>;
}
