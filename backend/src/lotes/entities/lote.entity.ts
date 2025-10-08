import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, Unique } from 'typeorm';
import { Produto } from '../../produtos/entities/produto.entity';
import { Insumo } from '../../insumos/entities/insumo.entity';
import { MovimentacaoEstoque } from '../../movimentacao-estoque/entities/movimentacao-estoque.entity';

@Entity()
@Unique(['codigoLote', 'idProduto'])
export class Lote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  codigoLote: number;

  @Column({ type: 'date' })
  dataValidade: Date;

  @Column({ nullable: true })
  idProduto: number | null;

  @Column({ nullable: true })
  idInsumo: number | null;

  @ManyToOne(() => Produto, { nullable: true })
  @JoinColumn({ name: 'idProduto' })
  produto: Produto;

  @ManyToOne(() => Insumo, { nullable: true })
  @JoinColumn({ name: 'idInsumo' })
  insumo: Insumo;

  @OneToMany(() => MovimentacaoEstoque, movimentacao => movimentacao.lote)
  movimentacoes: MovimentacaoEstoque[];
}