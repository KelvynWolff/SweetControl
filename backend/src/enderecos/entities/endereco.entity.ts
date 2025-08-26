import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Pessoa } from '../../pessoas/entities/pessoa.entity';
import { Bairro } from '../../bairros/entities/bairro.entity';

@Entity()
export class Endereco {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rua: string;

  @Column()
  numero: string;

  @Column()
  CEP: string;

  @Column()
  idBairro: number;

  @Column()
  idPessoa: number;

  @ManyToOne(() => Pessoa, pessoa => pessoa.enderecos)
  @JoinColumn({ name: 'idPessoa' })
  pessoa: Pessoa;

  @ManyToOne(() => Bairro)
  @JoinColumn({ name: 'idBairro' })
  bairro: Bairro;
}