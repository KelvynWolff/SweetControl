"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const usuario_entity_1 = require("./entities/usuario.entity");
let UsuariosService = class UsuariosService {
    usuarioRepository;
    constructor(usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }
    async onModuleInit() {
        const supervisorLogin = process.env.SUPERVISOR_LOGIN || 'admin_supervisor';
        const supervisorPassword = process.env.SUPERVISOR_PASSWORD || 'Mudar123!';
        const supervisorExistente = await this.usuarioRepository.findOneBy({ login: supervisorLogin });
        if (!supervisorExistente) {
            console.log('🚀 Criando usuário Supervisor padrão...');
            const novoSupervisor = this.usuarioRepository.create({
                login: supervisorLogin,
                senha: supervisorPassword,
                nome: 'Supervisor do Sistema',
                dataValidade: new Date('2099-12-31'),
                role: usuario_entity_1.UserRole.SUPERVISOR,
            });
            await this.usuarioRepository.save(novoSupervisor);
            console.log('✅ Supervisor criado com sucesso!');
        }
    }
    async create(createUsuarioDto) {
        const { idFuncionario, ...dadosBasicos } = createUsuarioDto;
        const novoUsuario = this.usuarioRepository.create({
            ...dadosBasicos,
            funcionario: idFuncionario ? { id: idFuncionario } : undefined,
        });
        return this.usuarioRepository.save(novoUsuario);
    }
    findAll() {
        return this.usuarioRepository.find();
    }
    async findOne(id) {
        const usuario = await this.usuarioRepository.findOneBy({ id });
        if (!usuario) {
            throw new common_1.NotFoundException(`Usuário com ID #${id} não encontrado.`);
        }
        return usuario;
    }
    async findOneByLogin(login) {
        return this.usuarioRepository.findOneBy({ login });
    }
    async update(id, updateUsuarioDto) {
        const usuario = await this.usuarioRepository.preload({
            id: id,
            ...updateUsuarioDto,
        });
        if (!usuario) {
            throw new common_1.NotFoundException(`Usuário com ID #${id} não encontrado.`);
        }
        return this.usuarioRepository.save(usuario);
    }
    async remove(id) {
        const result = await this.usuarioRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Usuário com ID #${id} não encontrado.`);
        }
    }
    async updateRole(id, newRole) {
        const usuario = await this.findOne(id);
        usuario.role = newRole;
        return this.usuarioRepository.save(usuario);
    }
    async findUnlinked() {
        return this.usuarioRepository.find({
            where: { funcionario: (0, typeorm_2.IsNull)() },
            select: ['id', 'login', 'role']
        });
    }
    async linkFuncionario(userId, funcionarioId, newRole) {
        const usuario = await this.usuarioRepository.findOneBy({ id: userId });
        if (!usuario)
            throw new common_1.NotFoundException('Usuário não encontrado');
        usuario.funcionario = { id: funcionarioId };
        if (newRole) {
            usuario.role = newRole;
        }
        return this.usuarioRepository.save(usuario);
    }
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsuariosService);
//# sourceMappingURL=usuarios.service.js.map