import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotasCompras } from './entities/notas-compras.entity';
import { ItensNotasCompras } from '../itens-notas-compras/entities/itens-notas-compras.entity';
import { Lote } from '../lotes/entities/lote.entity';
import { MovimentacaoEstoque } from '../movimentacao-estoque/entities/movimentacao-estoque.entity';
import { NotasComprasController } from './notas-compras.controller';
import { NotasComprasService } from './notas-compras.service';

@Module({
  imports: [TypeOrmModule.forFeature([NotasCompras, ItensNotasCompras, Lote, MovimentacaoEstoque])],
  controllers: [NotasComprasController],
  providers: [NotasComprasService],
})
export class NotasComprasModule {}