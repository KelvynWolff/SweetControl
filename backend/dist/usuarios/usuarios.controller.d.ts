import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UserRole } from './entities/usuario.entity';
export declare class UsuariosController {
    private readonly usuariosService;
    constructor(usuariosService: UsuariosService);
    create(createUsuarioDto: CreateUsuarioDto): Promise<import("./entities/usuario.entity").Usuario>;
    findAll(): Promise<import("./entities/usuario.entity").Usuario[]>;
    findOne(id: number): Promise<import("./entities/usuario.entity").Usuario>;
    update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<import("./entities/usuario.entity").Usuario>;
    remove(id: number): Promise<void>;
    updateRole(id: number, role: UserRole): Promise<import("./entities/usuario.entity").Usuario>;
    findUnlinked(): Promise<import("./entities/usuario.entity").Usuario[]>;
    linkFuncionario(id: number, body: {
        idFuncionario: number;
        role?: UserRole;
    }): Promise<import("./entities/usuario.entity").Usuario>;
}
