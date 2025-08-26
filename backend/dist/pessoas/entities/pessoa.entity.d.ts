import { Cidade } from '../../cidades/entities/cidade.entity';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { Fornecedor } from '../../fornecedores/entities/fornecedor.entity';
import { Funcionario } from '../../funcionarios/entities/funcionario.entity';
import { Telefone } from '../../telefones/entities/telefone.entity';
import { Email } from '../../emails/entities/email.entity';
import { Endereco } from '../../enderecos/entities/endereco.entity';
export declare class Pessoa {
    id: number;
    nome: string;
    cpfCnpj: string;
    idCidade: number;
    cidade: Cidade;
    cliente: Cliente;
    fornecedor: Fornecedor;
    funcionario: Funcionario;
    telefones: Telefone[];
    emails: Email[];
    enderecos: Endereco[];
}
