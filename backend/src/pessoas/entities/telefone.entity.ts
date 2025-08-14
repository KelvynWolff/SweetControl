import { Pessoa } from './pessoa.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('telefones')
export class Telefone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numero: string;

  @Column({ type: 'text', nullable: true })
  observacao: string;

  @ManyToOne(() => Pessoa, (pessoa) => pessoa.telefones, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idPessoa' })
  pessoa: Pessoa;
}