import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Produto } from './produto.entity';
import { Insumo } from './insumo.entity';

@Entity('receitas')
export class Receita {
  @PrimaryGeneratedColumn()
  id: number;
  
  @ManyToOne(() => Produto, (produto) => produto.receitas)
  @JoinColumn({ name: 'idProduto' })
  produto: Produto;
  
  @ManyToOne(() => Insumo, (insumo) => insumo.receitas)
  @JoinColumn({ name: 'idInsumo' })
  insumo: Insumo;
  
  @Column('double')
  qtdInsumo: number;
}