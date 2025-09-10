import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notificacao } from './entities/notificacao.entity';
import { CreateNotificacaoDto } from './dto/create-notificacao.dto';
import { UpdateNotificacaoDto } from './dto/update-notificacao.dto';
import { EmailsService } from '../emails/emails.service';
import { Pedido } from '../pedidos/entities/pedido.entity';

@Injectable()
export class NotificacoesService {
  constructor(
    @InjectRepository(Notificacao)
    private readonly notificacaoRepository: Repository<Notificacao>,
    private readonly emailService: EmailsService,
  ) {}

  create(createNotificacaoDto: CreateNotificacaoDto): Promise<Notificacao> {
    const notificacao = this.notificacaoRepository.create(createNotificacaoDto);
    return this.notificacaoRepository.save(notificacao);
  }

  async criarEEnviarNotificacaoDePedido(pedido: Pedido): Promise<Notificacao> {
    const emailDoCliente = pedido.cliente?.pessoa?.emails?.[0]?.email;
    if (!emailDoCliente) {
      throw new NotFoundException('Cliente não possui um email válido para envio.');
    }
    
    const mensagem = `O seu pedido #${pedido.id} foi recebido e está com o status: ${pedido.status}.`;
    const notificacao = this.notificacaoRepository.create({
      mensagem,
      idPedido: pedido.id,
    });
    const notificacaoSalva = await this.notificacaoRepository.save(notificacao);

    await this.emailService.enviarEmailPedido(pedido, emailDoCliente);

    return notificacaoSalva;
  }


  findAll(): Promise<Notificacao[]> {
    return this.notificacaoRepository.find({
      relations: [
        'pedido',
        'pedido.cliente',
        'pedido.cliente.pessoa',
        'pedido.cliente.pessoa.emails'
      ],
      order: { data: 'DESC' },
    });
  }

  async markAsRead(id: number, updateNotificacaoDto: UpdateNotificacaoDto): Promise<Notificacao> {
    const notificacao = await this.notificacaoRepository.preload({
      id: id,
      status_leitura: updateNotificacaoDto.status_leitura,
    });
    if (!notificacao) {
      throw new NotFoundException(`Notificação com o ID #${id} não encontrada.`);
    }
    return this.notificacaoRepository.save(notificacao);
  }

  async remove(id: number): Promise<void> {
    const result = await this.notificacaoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Notificação com o ID #${id} não encontrada.`);
    }
  }
}