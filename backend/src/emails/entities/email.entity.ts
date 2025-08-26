import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Pessoa } from '../../pessoas/entities/pessoa.entity';

@Entity()
export class Email {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  observacao: string;

  @Column()
  idPessoa: number;

  @ManyToOne(() => Pessoa, pessoa => pessoa.emails)
  @JoinColumn({ name: 'idPessoa' })
  pessoa: Pessoa;
}