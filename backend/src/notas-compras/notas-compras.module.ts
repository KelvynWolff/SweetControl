import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotasCompras } from './entities/notas-compras.entity';
import { ItensNotasCompras } from '../itens-notas-compras/entities/itens-notas-compras.entity';
import { Lote } from '../lotes/entities/lote.entity';
import { MovimentacaoEstoque } from '../movimentacao-estoque/entities/movimentacao-estoque.entity';
import { NotasComprasController } from './notas-compras.controller';
import { NotasComprasService } from './notas-compras.service';
import { FornecedoresModule } from '../fornecedores/fornecedores.module';
import { EstadosModule } from '../estados/estados.module';
import { CidadesModule } from '../cidades/cidades.module';
import { BairrosModule } from '../bairros/bairros.module';
import { Estado } from '../estados/entities/estado.entity';
import { Cidade } from '../cidades/entities/cidade.entity';
import { Bairro } from '../bairros/entities/bairro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NotasCompras, ItensNotasCompras, Lote, MovimentacaoEstoque]), FornecedoresModule, FornecedoresModule, EstadosModule, CidadesModule, BairrosModule],
  controllers: [NotasComprasController],
  providers: [NotasComprasService],
})
export class NotasComprasModule {}