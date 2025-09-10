import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { ItemPedido } from '../../itens-pedido/entities/item-pedido.entity';
import { Pagamento } from '../../pagamentos/entities/pagamento.entity';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  // Esta coluna espera um formato 'YYYY-MM-DD'
  @Column({ type: 'date' })
  data: Date;

  @Column()
  idCliente: number;

  @Column()
  status: string;

  @Column({ type: 'date', nullable: true })
  dataEntrega: Date;

  @Column({ nullable: true })
  enderecoEntrega: string;

  @Column({ nullable: true })
  observacao: string;

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'idCliente' })
  cliente: Cliente;

  @OneToMany(() => ItemPedido, item => item.pedido, { cascade: true })
  itens: ItemPedido[];

  @OneToOne(() => Pagamento, pagamento => pagamento.pedido, { cascade: true })
  pagamento: Pagamento;
}