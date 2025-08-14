import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Pedido } from './pedido.entity';
import { Produto } from '../../produtos/entities/produto.entity';

@Entity('itens_pedido')
export class ItensPedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('double')
  quantidade: number;

  @Column('double')
  preco: number;

  @ManyToOne(() => Pedido, (pedido) => pedido.itens, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idPedido' })
  pedido: Pedido;

  @ManyToOne(() => Produto, (produto) => produto.itensPedido)
  @JoinColumn({ name: 'idProduto' })
  produto: Produto;
}