import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Pessoa } from '../../pessoas/entities/pessoa.entity';

@Entity()
export class Funcionario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idPessoa: number;

  @Column({ type: 'date' })
  dataAdmissao: Date;

  @Column({ type: 'date', nullable: true })
  dataRecisao: Date | null;

  @OneToOne(() => Pessoa, { cascade: true })
  @JoinColumn({ name: 'idPessoa' })
  pessoa: Pessoa;
}