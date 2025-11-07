import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { NotasCompras } from '../../notas-compras/entities/notas-compras.entity';
import { Produto } from '../../produtos/entities/produto.entity';
import { Insumo } from '../../insumos/entities/insumo.entity';
import { Lote } from '../../lotes/entities/lote.entity';

@Entity()
export class ItensNotasCompras {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idNotasCompras: number;

  @Column({ nullable: true })
  idProduto: number | null;

  @Column({ nullable: true })
  idInsumo: number | null;

  @Column({ nullable: true })
  idLote: number | null;

  @Column({ type: 'double' })
  quantidade: number;

  @ManyToOne(() => NotasCompras, nota => nota.itens, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idNotasCompras' })
  notaCompra: NotasCompras;

  @ManyToOne(() => Produto, { nullable: true })
  @JoinColumn({ name: 'idProduto' })
  produto: Produto;
  
  @ManyToOne(() => Insumo, { nullable: true })
  @JoinColumn({ name: 'idInsumo' })
  insumo: Insumo;

  @ManyToOne(() => Lote, { nullable: true })
  @JoinColumn({ name: 'idLote' })
  lote: Lote;
}
