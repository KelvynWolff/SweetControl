import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
export declare class AuthService {
    private usuariosService;
    private jwtService;
    constructor(usuariosService: UsuariosService, jwtService: JwtService);
    validateUser(login: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
