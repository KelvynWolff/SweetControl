import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Pedido } from './pedido.entity';

@Entity('pagamentos')
export class Pagamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('double')
  valor: number;

  @Column()
  formaPagamento: string;
  
  @OneToOne(() => Pedido, pedido => pedido.pagamento)
  @JoinColumn({ name: 'idPedido' })
  pedido: Pedido;
}