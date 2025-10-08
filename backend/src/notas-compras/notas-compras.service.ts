import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { NotasCompras } from './entities/notas-compras.entity';
import { ItensNotasCompras } from '../itens-notas-compras/entities/itens-notas-compras.entity';
import { Lote } from '../lotes/entities/lote.entity';
import { MovimentacaoEstoque, TipoMovimentacao } from '../movimentacao-estoque/entities/movimentacao-estoque.entity';
import { CreateNotaCompraDto } from './dto/create-nota-compra.dto';

@Injectable()
export class NotasComprasService {
  constructor(
    private dataSource: DataSource,
  ) {}

  async create(createNotaCompraDto: CreateNotaCompraDto): Promise<NotasCompras> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const notaRepo = queryRunner.manager.getRepository(NotasCompras);
      const loteRepo = queryRunner.manager.getRepository(Lote);
      const movEstoqueRepo = queryRunner.manager.getRepository(MovimentacaoEstoque);

      const nota = notaRepo.create({
        chaveAcesso: createNotaCompraDto.chaveAcesso,
        idFornecedor: createNotaCompraDto.idFornecedor,
        data: createNotaCompraDto.data,
        valorTotal: createNotaCompraDto.valorTotal,
      });
      const novaNota = await queryRunner.manager.save(nota);

      for (const itemDto of createNotaCompraDto.itens) {
        const novoLote = loteRepo.create({
          codigoLote: itemDto.codigoLote,
          dataValidade: itemDto.dataValidade,
          idProduto: itemDto.idProduto,
          idInsumo: itemDto.idInsumo,
        });
        const loteSalvo = await queryRunner.manager.save(novoLote);

        const movimentacao = movEstoqueRepo.create({
          idLote: loteSalvo.id,
          tipo: TipoMovimentacao.ENTRADA_COMPRA,
          quantidade: itemDto.quantidade,
        });
        await queryRunner.manager.save(movimentacao);

        const itemNotaRepo = queryRunner.manager.getRepository(ItensNotasCompras);
        const itemNota = itemNotaRepo.create({
            idNotasCompras: novaNota.id,
            idProduto: itemDto.idProduto,
            idInsumo: itemDto.idInsumo,
            quantidade: itemDto.quantidade,
        });
        await queryRunner.manager.save(itemNota);
      }

      await queryRunner.commitTransaction();
      return novaNota;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  findAll(): Promise<NotasCompras[]> {
    return this.dataSource.getRepository(NotasCompras).find({ 
        relations: ['fornecedor', 'fornecedor.pessoa', 'itens', 'itens.produto', 'itens.insumo'],
        order: { data: 'DESC' }
    });
  }
}