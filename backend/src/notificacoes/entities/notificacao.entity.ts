import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Pedido } from '../../pedidos/entities/pedido.entity';

@Entity()
export class Notificacao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  idPedido: number;

  @Column('text')
  mensagem: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  data: Date;

  @Column({ default: false })
  status_leitura: boolean;

  @ManyToOne(() => Pedido)
  @JoinColumn({ name: 'idPedido' })
  pedido: Pedido;
}