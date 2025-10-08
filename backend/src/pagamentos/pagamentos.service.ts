import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagamento } from './entities/pagamento.entity';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { Pedido } from '../pedidos/entities/pedido.entity';

@Injectable()
export class PagamentosService {
  constructor(
    @InjectRepository(Pagamento)
    private readonly pagamentoRepository: Repository<Pagamento>,
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
  ) {}

  async create(createPagamentoDto: CreatePagamentoDto): Promise<Pagamento> {
    const pagamento = this.pagamentoRepository.create(createPagamentoDto);
    const novoPagamento = await this.pagamentoRepository.save(pagamento);

    await this.pedidoRepository.update(createPagamentoDto.idPedido, { status: 'Pago' });

    return novoPagamento;
  }

  findAll(): Promise<Pagamento[]> {
    return this.pagamentoRepository.find({ relations: ['pedido', 'pedido.cliente.pessoa'] });
  }
}