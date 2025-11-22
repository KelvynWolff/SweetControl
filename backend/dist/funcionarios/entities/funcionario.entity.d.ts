import { Pessoa } from '../../pessoas/entities/pessoa.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';
export declare class Funcionario {
    id: number;
    idPessoa: number;
    dataAdmissao: Date;
    dataRecisao: Date | null;
    pessoa: Pessoa;
    usuario: Usuario;
}
