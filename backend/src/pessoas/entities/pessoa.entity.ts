import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { Cidade } from '../../cidades/entities/cidade.entity';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { Fornecedor } from '../../fornecedores/entities/fornecedor.entity';
import { Funcionario } from '../../funcionarios/entities/funcionario.entity';
import { Telefone } from '../../telefones/entities/telefone.entity';
import { Email } from '../../emails/entities/email.entity';
import { Endereco } from '../../enderecos/entities/endereco.entity'; // <-- Importe a entidade Endereco

@Entity()
export class Pessoa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  cpfCnpj: string;

  @Column()
  idCidade: number;

  @ManyToOne(() => Cidade)
  @JoinColumn({ name: 'idCidade', referencedColumnName: 'codigobge' })
  cidade: Cidade;

  @OneToOne(() => Cliente, cliente => cliente.pessoa)
  cliente: Cliente;

  @OneToOne(() => Fornecedor, fornecedor => fornecedor.pessoa)
  fornecedor: Fornecedor;

  @OneToOne(() => Funcionario, funcionario => funcionario.pessoa)
  funcionario: Funcionario;

  @OneToMany(() => Telefone, telefone => telefone.pessoa)
  telefones: Telefone[];

  @OneToMany(() => Email, email => email.pessoa)
  emails: Email[];

  @OneToMany(() => Endereco, endereco => endereco.pessoa)
  enderecos: Endereco[];
}