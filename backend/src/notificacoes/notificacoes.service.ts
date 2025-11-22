import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notificacao } from './entities/notificacao.entity';
import { EmailsService } from '../emails/emails.service';
import { CreateNotificacaoDto } from './dto/create-notificacao.dto';
import { UpdateNotificacaoDto } from './dto/update-notificacao.dto';

@Injectable()
export class NotificacoesService {
  constructor(
    @InjectRepository(Notificacao)
    private readonly notificacaoRepository: Repository<Notificacao>,
    private readonly emailsService: EmailsService,
  ) {}

  create(createNotificacaoDto: CreateNotificacaoDto) {
    const notificacao = this.notificacaoRepository.create(createNotificacaoDto);
    return this.notificacaoRepository.save(notificacao);
  }

  findAll() {
    return this.notificacaoRepository.find({ order: { data: 'DESC' } });
  }

  findOne(id: number) {
    return this.notificacaoRepository.findOneBy({ id });
  }

  async markAsRead(id: number, updateNotificacaoDto: UpdateNotificacaoDto) {
    const notificacao = await this.findOne(id);
    if (!notificacao) {
        throw new NotFoundException(`Notificação #${id} não encontrada`);
    }
    this.notificacaoRepository.merge(notificacao, updateNotificacaoDto);
    return this.notificacaoRepository.save(notificacao);
  }

  async remove(id: number) {
    const result = await this.notificacaoRepository.delete(id);
    if (result.affected === 0) {
        throw new NotFoundException(`Notificação #${id} não encontrada`);
    }
  }

  async criarNotificacaoPedido(pedido: any) {
    const novaNotificacao = this.notificacaoRepository.create({
      mensagem: `Novo pedido #${pedido.id} realizado.`,
      data: new Date(),
      lida: false,
    });
    await this.notificacaoRepository.save(novaNotificacao);

    try {
        await this.emailsService.enviarEmailPedido(pedido);
    } catch (error) {
        console.error("Falha ao enviar notificação por email:", error.message);
    }
  }
}