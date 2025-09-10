import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
  ) {}

  async create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    const pedido = this.pedidoRepository.create({
      ...createPedidoDto,
      data: new Date(),
    });
    return this.pedidoRepository.save(pedido);
  }

  findAll(): Promise<Pedido[]> {
    return this.pedidoRepository.find({ relations: ['cliente', 'cliente.pessoa', 'itens', 'pagamento'] });
  }

  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOne({ 
      where: { id }, 
      relations: [
        'cliente', 
        'cliente.pessoa', 
        'cliente.pessoa.emails',
        'itens', 
        'itens.produto', 
        'pagamento'
      ] 
    });
    if (!pedido) {
      throw new NotFoundException(`Pedido com o ID #${id} não encontrado.`);
    }
    return pedido;
  }
  
  async updateStatus(id: number, status: string): Promise<Pedido> {
    const pedido = await this.pedidoRepository.preload({ id, status });
    if (!pedido) {
        throw new NotFoundException(`Pedido com o ID #${id} não encontrado.`);
    }
    return this.pedidoRepository.save(pedido);
  }

  async remove(id: number): Promise<void> {
    const pedido = await this.findOne(id);
    await this.pedidoRepository.remove(pedido);
  }
}