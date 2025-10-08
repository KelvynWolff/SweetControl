import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { ItemPedido } from '../itens-pedido/entities/item-pedido.entity';
import { Pagamento } from '../pagamentos/entities/pagamento.entity';
import { Produto } from '../produtos/entities/produto.entity';
import { PedidosController } from './pedidos.controller';
import { PedidosService } from './pedidos.service';
import { EmailsModule } from '../emails/emails.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido, ItemPedido, Pagamento, Produto]),
    EmailsModule,
  ],
  controllers: [PedidosController],
  providers: [PedidosService],
})
export class PedidosModule {}