import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { Endereco } from './endereco.entity';
import { Telefone } from './telefone.entity';
import { Email } from './email.entity';
import { Cliente } from './cliente.entity';
import { Fornecedor } from './fornecedor.entity';
import { Funcionario } from './funcionario.entity';

@Entity('pessoas')
export class Pessoa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  cpfCnpj: string;

  @OneToMany(() => Endereco, (endereco) => endereco.pessoa)
  enderecos: Endereco[];

  @OneToMany(() => Telefone, (telefone) => telefone.pessoa)
  telefones: Telefone[];

  @OneToMany(() => Email, (email) => email.pessoa)
  emails: Email[];
  
  @OneToOne(() => Cliente, cliente => cliente.pessoa)
  cliente: Cliente;

  @OneToOne(() => Fornecedor, fornecedor => fornecedor.pessoa)
  fornecedor: Fornecedor;

  @OneToOne(() => Funcionario, funcionario => funcionario.pessoa)
  funcionario: Funcionario;
}