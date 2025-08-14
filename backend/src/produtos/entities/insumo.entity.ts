import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Receita } from './receita.entity';

@Entity('insumos')
export class Insumo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column('double')
  valor: number;

  @Column()
  unidadeMedida: string;
  
  @Column('double')
  estoque: number;

  @OneToMany(() => Receita, (receita) => receita.insumo)
  receitas: Receita[];
}