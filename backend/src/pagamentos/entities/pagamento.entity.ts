import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
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

  @Column({ type: 'date' })
  dataPagamento: Date;

  @ManyToOne(() => Pedido, pedido => pedido.pagamentos)
  @JoinColumn({ name: 'idPedido' })
  pedido: Pedido;
}