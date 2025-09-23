export declare class Usuario {
    id: number;
    login: string;
    senha: string;
    nome: string;
    dataValidade: Date;
    hashPassword(): Promise<void>;
}
