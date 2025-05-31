import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Pessoa } from './pessoa.entity';
import { Pedido } from '../../vendas/entities/pedido.entity';
import { OneToMany } from 'typeorm';
import { Producao } from '../../producao/entities/producao.entity';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Pessoa, pessoa => pessoa.cliente)
  @JoinColumn({ name: 'idPessoa' })
  pessoa: Pessoa;

  @OneToMany(() => Pedido, (pedido) => pedido.cliente)
  pedidos: Pedido[];

  @OneToMany(() => Producao, (producao) => producao.cliente)
  producoes: Producao[];
}