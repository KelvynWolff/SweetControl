import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Insumo } from './entities/insumo.entity';
import { InsumosController } from './insumos.controller';
import { InsumosService } from './insumos.service';
import { Lote } from '../lotes/entities/lote.entity';
import { MovimentacaoEstoque } from '../movimentacao-estoque/entities/movimentacao-estoque.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Insumo, Lote, MovimentacaoEstoque])],
  controllers: [InsumosController],
  providers: [InsumosService],
})
export class InsumosModule {}