import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Cidade } from '../../cidades/entities/cidade.entity';

@Entity()
export class Pessoa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  cpfCnpj: string;

  @Column()
  idCidade: number;

  @ManyToOne(() => Cidade)
  @JoinColumn({ name: 'idCidade', referencedColumnName: 'codigobge' })
  cidade: Cidade;
}