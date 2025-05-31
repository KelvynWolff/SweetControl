import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Cliente } from '../../pessoas/entities/cliente.entity';
import { ItensPedido } from './itens-pedido.entity';
import { Pagamento } from './pagamento.entity';
import { Notificacao } from '../../notificacoes/entities/notificacao.entity';

@Entity('pedidos')
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  data: Date;

  @Column()
  status: string;

  @Column({ type: 'text' })
  enderecoEntrega: string;

  @Column({ type: 'text', nullable: true })
  observacao: string;

  @ManyToOne(() => Cliente, (cliente) => cliente.pedidos)
  @JoinColumn({ name: 'idCliente' })
  cliente: Cliente;

  @OneToMany(() => ItensPedido, (item) => item.pedido)
  itens: ItensPedido[];

  @OneToOne(() => Pagamento, (pagamento) => pagamento.pedido)
  pagamento: Pagamento;

  @OneToMany(() => Notificacao, (notificacao) => notificacao.pedido)
  notificacoes: Notificacao[];
}