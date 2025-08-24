import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Produto } from '../../produtos/entities/produto.entity';

@Entity()
export class Promocao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  tipoDeDesconto: string;

  @Column({ type: 'double' })
  valor: number;

  @Column({ type: 'date' })
  dataInicio: Date;

  @Column({ type: 'date' })
  dataFim: Date;

  @Column({ nullable: true })
  idProduto: number;

  @ManyToOne(() => Produto)
  @JoinColumn({ name: 'idProduto' })
  produto: Produto;
}