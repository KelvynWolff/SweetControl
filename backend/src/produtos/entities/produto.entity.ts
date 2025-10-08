import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Receita } from '../../receitas/entities/receita.entity';
import { Lote } from '../../lotes/entities/lote.entity';

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ type: 'double' })
  preco: number;

  @Column()
  unidadeMedida: string;

  @Column({ type: 'double' })
  custo: number;

  @Column({ type: 'double' })
  margem: number;

  @Column({ type: 'text', nullable: true })
  descricao: string;

  @Column({ default: true })
  ativo: boolean;

  @OneToMany(() => Receita, receita => receita.produto)
  receitas: Receita[];

  @OneToMany(() => Lote, lote => lote.produto)
  lotes: Lote[];
}