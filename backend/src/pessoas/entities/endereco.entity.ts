import { Bairro } from '../../localizacao/entities/bairro.entity';
import { Pessoa } from './pessoa.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('enderecos')
export class Endereco {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rua: string;

  @Column()
  numero: string;

  @Column()
  cep: string;

  // Relação com Pessoa
  @ManyToOne(() => Pessoa, (pessoa) => pessoa.enderecos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idPessoa' })
  pessoa: Pessoa;

  // Relação com Bairro
  @ManyToOne(() => Bairro, (bairro) => bairro.enderecos)
  @JoinColumn({ name: 'idBairro' })
  bairro: Bairro;
}