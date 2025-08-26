import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Pessoa } from '../../pessoas/entities/pessoa.entity';

@Entity()
export class Telefone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numero: string;

  @Column({ nullable: true })
  observacao: string;

  @Column()
  idPessoa: number;

  @ManyToOne(() => Pessoa, pessoa => pessoa.telefones)
  @JoinColumn({ name: 'idPessoa' })
  pessoa: Pessoa;
}