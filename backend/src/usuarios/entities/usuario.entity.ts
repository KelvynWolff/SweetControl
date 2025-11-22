import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { Funcionario } from '../../funcionarios/entities/funcionario.entity';

export enum UserRole {
  USER = 'user',
  SUPERVISOR = 'supervisor',
}

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

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToOne(() => Funcionario)
  @JoinColumn({ name: 'idFuncionario' })
  funcionario: Funcionario;

  @BeforeInsert()
  async hashPassword() {
    if (this.senha) {
        this.senha = await bcrypt.hash(this.senha, 10);
    }
  }
}