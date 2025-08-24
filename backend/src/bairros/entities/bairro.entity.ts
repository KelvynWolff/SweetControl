import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Cidade } from '../../cidades/entities/cidade.entity';

@Entity()
export class Bairro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  ibgeCidade: number;

  @ManyToOne(() => Cidade)
  @JoinColumn({ name: 'ibgeCidade', referencedColumnName: 'codigobge' })
  cidade: Cidade;
}