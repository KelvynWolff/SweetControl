import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Estado } from '../../estados/entities/estado.entity';

@Entity()
export class Cidade {
  @PrimaryColumn()
  codigobge: number;

  @Column()
  nome: string;

  @Column({ length: 2 })
  estado: string;

  @ManyToOne(() => Estado)
  @JoinColumn({ name: 'estado', referencedColumnName: 'sigla' })
  estadoRel: Estado;
}