import { Cidade } from './cidade.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('estados')
export class Estado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 2, unique: true })
  sigla: string;

  @Column()
  nome: string;

  @OneToMany(() => Cidade, (cidade) => cidade.estado)
  cidades: Cidade[];
}