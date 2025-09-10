import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Pedido } from '../../pedidos/entities/pedido.entity';

@Entity()
export class Pagamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idPedido: number;

  @Column({ type: 'double' })
  valor: number;

  @Column()
  formaPagamento: string;

  @OneToOne(() => Pedido, pedido => pedido.pagamento)
  @JoinColumn({ name: 'idPedido' })
  pedido: Pedido;
}