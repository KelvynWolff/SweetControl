import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Lote } from '../../lotes/entities/lote.entity';
import { Receita } from '../../receitas/entities/receita.entity';

@Entity()
export class Insumo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ type: 'double' })
  valor: number;

  @Column()
  unidadeMedida: string;


  @OneToMany(() => Lote, lote => lote.insumo)
  lotes: Lote[];

  @OneToMany(() => Receita, receita => receita.insumo)
  receitas: Receita[];
}