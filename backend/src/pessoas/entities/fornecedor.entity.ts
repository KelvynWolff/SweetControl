import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Pessoa } from './pessoa.entity';

@Entity('fornecedores')
export class Fornecedor {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Pessoa, pessoa => pessoa.fornecedor)
  @JoinColumn({ name: 'idPessoa' })
  pessoa: Pessoa;
}