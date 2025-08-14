import { Pessoa } from './pessoa.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('emails')
export class Email {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ type: 'text', nullable: true })
  observacao: string;

  @ManyToOne(() => Pessoa, (pessoa) => pessoa.emails, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idPessoa' })
  pessoa: Pessoa;
}