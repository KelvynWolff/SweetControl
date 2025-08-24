import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Estado {
  @PrimaryColumn('varchar', { length: 2 })
  sigla: string;

  @Column()
  nome: string;
}