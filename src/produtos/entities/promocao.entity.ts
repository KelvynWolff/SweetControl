import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Produto } from './produto.entity';

@Entity('promocoes')
export class Promocao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('double')
  valor: number;

  @Column({ type: 'date' })
  dataInicio: Date;

  @Column({ type: 'date' })
  dataFim: Date;
  
  @ManyToOne(() => Produto, (produto) => produto.promocoes)
  @JoinColumn({ name: 'idProduto' })
  produto: Produto;
}