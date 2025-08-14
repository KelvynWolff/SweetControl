import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Promocao } from './promocao.entity';
import { Receita } from './receita.entity';
import { ItensPedido } from '../../vendas/entities/itens-pedido.entity';

@Entity('produtos')
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  nome: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  preco: number;

  @Column()
  unidadeMedida: string;

  @Column('double')
  estoque: number;
  
  @Column('double')
  custo: number;

  @Column('double')
  margem: number;

  @Column({ type: 'text', nullable: true })
  descricao: string;

  @Column({ default: true })
  ativo: boolean;

  @OneToMany(() => Receita, (receita) => receita.produto)
  receitas: Receita[];

  @OneToMany(() => Promocao, (promocao) => promocao.produto)
  promocoes: Promocao[];

  @OneToMany(() => ItensPedido, (item) => item.produto)
  itensPedido: ItensPedido[];
}