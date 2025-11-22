import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { ItemPedido } from '../../itens-pedido/entities/item-pedido.entity';
import { Pagamento } from '../../pagamentos/entities/pagamento.entity';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  data: Date;

  @Column()
  idCliente: number;

  @Column({ default: 'AGUARDANDO PAGAMENTO' })
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

  @OneToMany(() => Pagamento, pagamento => pagamento.pedido)
  pagamentos: Pagamento[];
}