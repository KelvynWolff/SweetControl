import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Lote } from '../../lotes/entities/lote.entity';

export enum TipoMovimentacao {
  ENTRADA_COMPRA = 'ENTRADA_COMPRA',
  ENTRADA_PRODUCAO = 'ENTRADA_PRODUCAO',
  ENTRADA_DEVOLUCAO = 'ENTRADA_DEVOLUCAO',
  SAIDA_VENDA = 'SAIDA_VENDA',
  SAIDA_PRODUCAO = 'SAIDA_PRODUCAO',
  PERDA = 'PERDA',
}

@Entity()
export class MovimentacaoEstoque {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idLote: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  data: Date;

  @Column({
    type: 'enum',
    enum: TipoMovimentacao,
  })
  tipo: TipoMovimentacao;

  @Column({ type: 'double' })
  quantidade: number;

  @ManyToOne(() => Lote, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idLote' })
  lote: Lote;
}