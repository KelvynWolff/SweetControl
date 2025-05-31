import { Cidade } from './cidade.entity';
import { Endereco } from '../../pessoas/entities/endereco.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity('bairros')
export class Bairro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @ManyToOne(() => Cidade, (cidade) => cidade.bairros)
  cidade: Cidade;

  @OneToMany(() => Endereco, (endereco) => endereco.bairro)
  enderecos: Endereco[];
}