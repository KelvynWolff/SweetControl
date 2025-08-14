import { Bairro } from './bairro.entity';
import { Estado } from './estado.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity('cidades')
export class Cidade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  codigoIbge: number;

  @Column()
  nome: string;

  @ManyToOne(() => Estado, (estado) => estado.cidades)
  estado: Estado;

  @OneToMany(() => Bairro, (bairro) => bairro.cidade)
  bairros: Bairro[];
}