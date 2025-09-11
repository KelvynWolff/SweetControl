import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { Produto } from '../produtos/entities/produto.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { ItemPedido } from '../itens-pedido/entities/item-pedido.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    private dataSource: DataSource,
  ) {}

  async create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      const produtoRepo = queryRunner.manager.getRepository(Produto);
      
      for (const item of createPedidoDto.itens) {
        const produto = await produtoRepo.findOneBy({ id: item.idProduto });
        if (!produto) {
          throw new NotFoundException(`Produto com ID #${item.idProduto} não encontrado.`);
        }
        if (produto.estoque < item.quantidade) {
          throw new UnprocessableEntityException(`Estoque insuficiente para o produto "${produto.nome}".`);
        }
        produto.estoque -= item.quantidade;
        await queryRunner.manager.save(produto);
      }

      const pedido = this.pedidoRepository.create({
        ...createPedidoDto,
        data: new Date(),
      });
      const novoPedido = await queryRunner.manager.save(pedido);

      await queryRunner.commitTransaction();
      return this.findOne(novoPedido.id);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  findAll(): Promise<Pedido[]> {
    return this.pedidoRepository.find({ 
      relations: ['cliente', 'cliente.pessoa'], 
      order: { id: 'DESC' } 
    });
  }

  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOne({ 
      where: { id }, 
      relations: ['cliente', 'cliente.pessoa', 'cliente.pessoa.emails', 'itens', 'itens.produto', 'pagamento'] 
    });
    if (!pedido) {
      throw new NotFoundException(`Pedido com o ID #${id} não encontrado.`);
    }
    return pedido;
  }
  
  async update(id: number, updatePedidoDto: UpdatePedidoDto): Promise<Pedido> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        const produtoRepo = queryRunner.manager.getRepository(Produto);
        const pedidoRepo = queryRunner.manager.getRepository(Pedido);
        const itemPedidoRepo = queryRunner.manager.getRepository(ItemPedido);
        const pedidoExistente = await this.findOne(id);

        if (updatePedidoDto.itens) {
            for (const item of pedidoExistente.itens) {
                const produto = await produtoRepo.findOneBy({ id: item.idProduto });
                if (produto) {
                    produto.estoque += item.quantidade;
                    await queryRunner.manager.save(produto);
                }
            }

            for (const item of updatePedidoDto.itens) {
                const produto = await produtoRepo.findOneBy({ id: item.idProduto });
                if (!produto || produto.estoque < item.quantidade) {
                    throw new UnprocessableEntityException(`Estoque insuficiente para o novo item "${produto?.nome || 'desconhecido'}".`);
                }
                produto.estoque -= item.quantidade;
                await queryRunner.manager.save(produto);
            }
            await itemPedidoRepo.delete({ idPedido: id });
        }
        
        const pedidoAtualizado = pedidoRepo.merge(pedidoExistente, updatePedidoDto);
        await queryRunner.manager.save(pedidoAtualizado);

        await queryRunner.commitTransaction();
        return this.findOne(id);
    } catch (err) {
        await queryRunner.rollbackTransaction();
        throw err;
    } finally {
        await queryRunner.release();
    }
  }

  async remove(id: number): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        const produtoRepo = queryRunner.manager.getRepository(Produto);
        const pedido = await this.findOne(id);

        for (const item of pedido.itens) {
            const produto = await produtoRepo.findOneBy({ id: item.idProduto });
            if (produto) {
                produto.estoque += item.quantidade;
                await queryRunner.manager.save(produto);
            }
        }

        await queryRunner.manager.remove(pedido);

        await queryRunner.commitTransaction();
    } catch (err) {
        await queryRunner.rollbackTransaction();
        throw err;
    } finally {
        await queryRunner.release();
    }
  }

  async updateStatus(id: number, status: string): Promise<Pedido> {
    const pedido = await this.pedidoRepository.preload({ id, status });
    if (!pedido) {
        throw new NotFoundException(`Pedido com o ID #${id} não encontrado.`);
    }
    return this.pedidoRepository.save(pedido);
  }
}