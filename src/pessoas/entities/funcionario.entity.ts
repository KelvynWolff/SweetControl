import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Pessoa } from './pessoa.entity';

@Entity('funcionarios')
export class Funcionario {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Pessoa, pessoa => pessoa.funcionario)
  @JoinColumn({ name: 'idPessoa' })
  pessoa: Pessoa;

  @Column({ type: 'date' })
  dataAdmissao: Date;

  @Column({ type: 'date', nullable: true })
  dataRecisao: Date;
}