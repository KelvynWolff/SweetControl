import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Usuario, UserRole } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService implements OnModuleInit {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

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
        role: UserRole.SUPERVISOR,
      });

      await this.usuarioRepository.save(novoSupervisor);
      console.log('✅ Supervisor criado com sucesso!');
    }
  }

  async create(createUsuarioDto: CreateUsuarioDto) {
    const { idFuncionario, ...dadosBasicos } = createUsuarioDto;

    const novoUsuario = this.usuarioRepository.create({
      ...dadosBasicos,
      funcionario: idFuncionario ? { id: idFuncionario } : undefined,
    });

    return this.usuarioRepository.save(novoUsuario);
  }

  findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (!usuario) {
      throw new NotFoundException(`Usuário com ID #${id} não encontrado.`);
    }
    return usuario;
  }

  async findOneByLogin(login: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOneBy({ login });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.usuarioRepository.preload({
      id: id,
      ...updateUsuarioDto,
    });
    if (!usuario) {
      throw new NotFoundException(`Usuário com ID #${id} não encontrado.`);
    }
    return this.usuarioRepository.save(usuario);
  }

  async remove(id: number): Promise<void> {
    const result = await this.usuarioRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Usuário com ID #${id} não encontrado.`);
    }
  }

  async updateRole(id: number, newRole: UserRole): Promise<Usuario> {
    const usuario = await this.findOne(id);
    usuario.role = newRole;
    return this.usuarioRepository.save(usuario);
  }

  async findUnlinked(): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      where: { funcionario: IsNull() },
      select: ['id', 'login', 'role']
    });
  }

  async linkFuncionario(userId: number, funcionarioId: number, newRole?: UserRole) {
    const usuario = await this.usuarioRepository.findOneBy({ id: userId });
    if (!usuario) throw new NotFoundException('Usuário não encontrado');

    usuario.funcionario = { id: funcionarioId } as any;
    if (newRole) {
        usuario.role = newRole;
    }
    return this.usuarioRepository.save(usuario);
  }
}