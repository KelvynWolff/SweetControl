import { Pedido } from '../../vendas/entities/pedido.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('notificacoes')
export class Notificacao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  mensagem: string;

  @CreateDateColumn()
  data: Date;

  @Column({ default: false })
  status_leitura: boolean;

  @ManyToOne(() => Pedido, pedido => pedido.notificacoes)
  @JoinColumn({ name: 'idPedido' })
  pedido: Pedido;
}