import { Endereco } from './endereco.entity';
import { Telefone } from './telefone.entity';
import { Email } from './email.entity';
import { Cliente } from './cliente.entity';
import { Fornecedor } from './fornecedor.entity';
import { Funcionario } from './funcionario.entity';
export declare class Pessoa {
    id: number;
    nome: string;
    cpfCnpj: string;
    enderecos: Endereco[];
    telefones: Telefone[];
    emails: Email[];
    cliente: Cliente;
    fornecedor: Fornecedor;
    funcionario: Funcionario;
}
