import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Produto } from '../../produtos/entities/produto.entity';
import { Insumo } from '../../insumos/entities/insumo.entity';

@Entity()
export class Receita {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idProduto: number;

  @Column()
  idInsumo: number;

  @Column({ type: 'double' })
  qtdInsumo: number;

  @ManyToOne(() => Produto, produto => produto.receitas)
  @JoinColumn({ name: 'idProduto' })
  produto: Produto;

  @ManyToOne(() => Insumo, insumo => insumo.receitas)
  @JoinColumn({ name: 'idInsumo' })
  insumo: Insumo;
}