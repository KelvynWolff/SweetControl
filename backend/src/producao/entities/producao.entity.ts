import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Produto } from '../../produtos/entities/produto.entity';

@Entity()
export class Producao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  data: Date;

  @Column()
  idProduto: number;

  @Column({ type: 'double' })
  quantidade: number;

  @Column({ type: 'date', nullable: true })
  dataValidade: Date;

  @Column({ type: 'text', nullable: true })
  observacao: string;

  @ManyToOne(() => Produto)
  @JoinColumn({ name: 'idProduto' })
  produto: Produto;
}