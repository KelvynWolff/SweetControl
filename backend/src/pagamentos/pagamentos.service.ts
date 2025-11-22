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

  async remove(id: number): Promise<void> {
    const pagamento = await this.pagamentoRepository.findOneBy({ id });

    if (!pagamento) {
        throw new NotFoundException(`Pagamento com ID #${id} não encontrado.`);
    }
    
    const idPedido = pagamento.idPedido;

    await this.pagamentoRepository.remove(pagamento);

    const pedido = await this.pedidoRepository.findOne({
        where: { id: idPedido },
        relations: ['itens', 'pagamentos']
    });

    if (pedido) {
        const totalPedido = pedido.itens.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
        const totalPago = pedido.pagamentos.reduce((acc, pag) => acc + Number(pag.valor), 0);

        if (totalPago < (totalPedido - 0.01) && pedido.status !== 'Cancelado') {
            await this.pedidoRepository.update(idPedido, { status: 'PAGAMENTO PARCIAL' });
        } 
        if (totalPago === 0 && pedido.status !== 'Cancelado') {
             await this.pedidoRepository.update(idPedido, { status: 'AGUARDANDO PAGAMENTO' });
        }
    }
  }

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