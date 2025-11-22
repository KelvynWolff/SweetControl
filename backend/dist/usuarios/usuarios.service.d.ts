import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Usuario, UserRole } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
export declare class UsuariosService implements OnModuleInit {
    private readonly usuarioRepository;
    constructor(usuarioRepository: Repository<Usuario>);
    onModuleInit(): Promise<void>;
    create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario>;
    findAll(): Promise<Usuario[]>;
    findOne(id: number): Promise<Usuario>;
    findOneByLogin(login: string): Promise<Usuario | null>;
    update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario>;
    remove(id: number): Promise<void>;
    updateRole(id: number, newRole: UserRole): Promise<Usuario>;
    findUnlinked(): Promise<Usuario[]>;
    linkFuncionario(userId: number, funcionarioId: number, newRole?: UserRole): Promise<Usuario>;
}
