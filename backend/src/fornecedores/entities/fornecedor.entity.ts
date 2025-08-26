import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Pessoa } from '../../pessoas/entities/pessoa.entity';

@Entity()
export class Fornecedor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idPessoa: number;

  @OneToOne(() => Pessoa, { cascade: true })
  @JoinColumn({ name: 'idPessoa' })
  pessoa: Pessoa;
}