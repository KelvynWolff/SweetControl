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
exports.FuncionariosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const funcionario_entity_1 = require("./entities/funcionario.entity");
const pessoa_entity_1 = require("../pessoas/entities/pessoa.entity");
const endereco_entity_1 = require("../enderecos/entities/endereco.entity");
const telefone_entity_1 = require("../telefones/entities/telefone.entity");
const email_entity_1 = require("../emails/entities/email.entity");
let FuncionariosService = class FuncionariosService {
    funcionarioRepository;
    pessoaRepository;
    dataSource;
    constructor(funcionarioRepository, pessoaRepository, dataSource) {
        this.funcionarioRepository = funcionarioRepository;
        this.pessoaRepository = pessoaRepository;
        this.dataSource = dataSource;
    }
    async create(createFuncionarioDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const pessoaRepo = queryRunner.manager.getRepository(pessoa_entity_1.Pessoa);
            const enderecoRepo = queryRunner.manager.getRepository(endereco_entity_1.Endereco);
            const funcionarioRepo = queryRunner.manager.getRepository(funcionario_entity_1.Funcionario);
            const telefoneRepo = queryRunner.manager.getRepository(telefone_entity_1.Telefone);
            const emailRepo = queryRunner.manager.getRepository(email_entity_1.Email);
            const pessoa = pessoaRepo.create({
                nome: createFuncionarioDto.nome,
                cpfCnpj: createFuncionarioDto.cpfCnpj,
                idCidade: createFuncionarioDto.endereco.idCidade,
            });
            const novaPessoa = await queryRunner.manager.save(pessoa);
            const funcionario = funcionarioRepo.create({
                idPessoa: novaPessoa.id,
                dataAdmissao: createFuncionarioDto.dataAdmissao,
                dataRecisao: null,
            });
            const novoFuncionario = await queryRunner.manager.save(funcionario);
            const endereco = enderecoRepo.create({ ...createFuncionarioDto.endereco, idPessoa: novaPessoa.id });
            await queryRunner.manager.save(endereco);
            for (const tel of createFuncionarioDto.telefones) {
                if (tel.numero) {
                    const telefone = telefoneRepo.create({ ...tel, idPessoa: novaPessoa.id });
                    await queryRunner.manager.save(telefone);
                }
            }
            for (const mail of createFuncionarioDto.emails) {
                if (mail.email) {
                    const email = emailRepo.create({ ...mail, idPessoa: novaPessoa.id });
                    await queryRunner.manager.save(email);
                }
            }
            await queryRunner.commitTransaction();
            return this.findOne(novoFuncionario.id);
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    findAll() {
        return this.funcionarioRepository.find({ relations: ['pessoa', 'pessoa.cidade'] });
    }
    async findOne(id) {
        const funcionario = await this.funcionarioRepository.findOne({ where: { id }, relations: ['pessoa', 'pessoa.cidade'] });
        if (!funcionario) {
            throw new common_1.NotFoundException(`Funcionário com o ID #${id} não encontrado.`);
        }
        return funcionario;
    }
    async update(id, updateFuncionarioDto) {
        const funcionario = await this.findOne(id);
        const pessoaAtualizada = await this.pessoaRepository.preload({
            id: funcionario.idPessoa,
            ...updateFuncionarioDto,
        });
        if (!pessoaAtualizada) {
            throw new common_1.NotFoundException(`Pessoa associada ao funcionário #${id} não foi encontrada.`);
        }
        await this.pessoaRepository.save(pessoaAtualizada);
        const funcionarioAtualizado = await this.funcionarioRepository.preload({
            id: id,
            dataAdmissao: updateFuncionarioDto.dataAdmissao,
            dataRecisao: updateFuncionarioDto.dataRecisao,
        });
        if (!funcionarioAtualizado) {
            throw new common_1.NotFoundException(`Funcionário com o ID #${id} não foi encontrado para atualização.`);
        }
        await this.funcionarioRepository.save(funcionarioAtualizado);
        return this.findOne(id);
    }
    async remove(id) {
        const funcionario = await this.findOne(id);
        await this.funcionarioRepository.remove(funcionario);
        await this.pessoaRepository.delete(funcionario.idPessoa);
    }
};
exports.FuncionariosService = FuncionariosService;
exports.FuncionariosService = FuncionariosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(funcionario_entity_1.Funcionario)),
    __param(1, (0, typeorm_1.InjectRepository)(pessoa_entity_1.Pessoa)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], FuncionariosService);
//# sourceMappingURL=funcionarios.service.js.map