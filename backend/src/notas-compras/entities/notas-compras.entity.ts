import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Fornecedor } from '../../fornecedores/entities/fornecedor.entity';
import { ItensNotasCompras } from '../../itens-notas-compras/entities/itens-notas-compras.entity';

@Entity()
export class NotasCompras {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  chaveAcesso: string;

  @Column()
  idFornecedor: number;

  @Column({ type: 'date' })
  data: Date;

  @Column({ type: 'double' })
  valorTotal: number;

  @Column({ type: 'text', nullable: true })
  xmlArquivo: string;

  @ManyToOne(() => Fornecedor)
  @JoinColumn({ name: 'idFornecedor' })
  fornecedor: Fornecedor;

  @OneToMany(() => ItensNotasCompras, item => item.notaCompra, { cascade: true })
  itens: ItensNotasCompras[];
}