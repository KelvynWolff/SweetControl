import { Cliente } from '../../pessoas/entities/cliente.entity';
import { Produto } from '../../produtos/entities/produto.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('producao')
export class Producao {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  data: Date;

  @Column({ default: false })
  producaoEstoque: boolean;

  @Column('double')
  quantidade: number;

  @Column({ type: 'date' })
  dataValidade: Date;

  @Column({ type: 'text', nullable: true })
  observacao: string;

  // Relação com Cliente (conforme diagrama)
  @ManyToOne(() => Cliente, cliente => cliente.producoes)
  @JoinColumn({ name: 'idCliente' })
  cliente: Cliente;

  // Relação com Produto
  @ManyToOne(() => Produto)
  @JoinColumn({ name: 'idProduto' })
  produto: Produto;
}