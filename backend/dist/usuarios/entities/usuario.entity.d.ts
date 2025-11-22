import { Funcionario } from '../../funcionarios/entities/funcionario.entity';
export declare enum UserRole {
    USER = "user",
    SUPERVISOR = "supervisor"
}
export declare class Usuario {
    id: number;
    login: string;
    senha: string;
    nome: string;
    dataValidade: Date;
    role: UserRole;
    funcionario: Funcionario;
    hashPassword(): Promise<void>;
}
