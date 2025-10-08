import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pagamento } from './entities/pagamento.entity';
import { Pedido } from '../pedidos/entities/pedido.entity';
import { PagamentosController } from './pagamentos.controller';
import { PagamentosService } from './pagamentos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pagamento, Pedido])],
  controllers: [PagamentosController],
  providers: [PagamentosService],
})
export class PagamentosModule {}