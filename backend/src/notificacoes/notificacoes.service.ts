import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notificacao } from './entities/notificacao.entity';
import { CreateNotificacaoDto } from './dto/create-notificacao.dto';

@Injectable()
export class NotificacoesService {
  constructor(
    @InjectRepository(Notificacao)
    private readonly notificacaoRepository: Repository<Notificacao>,
  ) {}

  create(createNotificacaoDto: CreateNotificacaoDto): Promise<Notificacao> {
    const notificacao = this.notificacaoRepository.create(createNotificacaoDto);
    return this.notificacaoRepository.save(notificacao);
  }
}