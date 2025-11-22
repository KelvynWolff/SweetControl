import { Injectable } from '@nestjs/common';
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

    const pedido = await this.pedidoRepository.findOne({
        where: { id: createPagamentoDto.idPedido },
        relations: ['itens', 'pagamentos']
    });

    if (pedido) {
        const totalPedido = pedido.itens.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
        
        const totalPago = pedido.pagamentos.reduce((acc, pag) => acc + Number(pag.valor), 0);

        if (totalPago >= (totalPedido - 0.01)) {
            await this.pedidoRepository.update(pedido.id, { status: 'EM PRODUÇÃO' });
        }
    }

    return novoPagamento;
  }

  findAll(): Promise<Pagamento[]> {
    return this.pagamentoRepository.find({ relations: ['pedido', 'pedido.cliente.pessoa'] });
  }
}