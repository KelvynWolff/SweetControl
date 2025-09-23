import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  login: string;

  @Exclude()
  @Column()
  senha: string;

  @Column()
  nome: string;

  @Column({ type: 'date' })
  dataValidade: Date;

  @BeforeInsert()
  async hashPassword() {
    this.senha = await bcrypt.hash(this.senha, 10);
  }
}