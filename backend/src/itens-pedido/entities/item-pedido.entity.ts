import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Pedido } from '../../pedidos/entities/pedido.entity';
import { Produto } from '../../produtos/entities/produto.entity';

@Entity()
export class ItemPedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idPedido: number;

  @Column()
  idProduto: number;

  @Column({ type: 'double' })
  quantidade: number;

  @Column({ type: 'double' })
  preco: number;

  @Column({ type: 'double', nullable: true, default: 0 })
  desconto: number;

  @ManyToOne(() => Pedido, pedido => pedido.itens, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idPedido' })
  pedido: Pedido;

  @ManyToOne(() => Produto)
  @JoinColumn({ name: 'idProduto' })
  produto: Produto;
}