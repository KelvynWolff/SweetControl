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
exports.FornecedoresService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const fornecedor_entity_1 = require("./entities/fornecedor.entity");
const pessoa_entity_1 = require("../pessoas/entities/pessoa.entity");
const endereco_entity_1 = require("../enderecos/entities/endereco.entity");
const telefone_entity_1 = require("../telefones/entities/telefone.entity");
const email_entity_1 = require("../emails/entities/email.entity");
let FornecedoresService = class FornecedoresService {
    fornecedorRepository;
    pessoaRepository;
    dataSource;
    constructor(fornecedorRepository, pessoaRepository, dataSource) {
        this.fornecedorRepository = fornecedorRepository;
        this.pessoaRepository = pessoaRepository;
        this.dataSource = dataSource;
    }
    async create(createFornecedorDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const pessoaRepo = queryRunner.manager.getRepository(pessoa_entity_1.Pessoa);
            const enderecoRepo = queryRunner.manager.getRepository(endereco_entity_1.Endereco);
            const fornecedorRepo = queryRunner.manager.getRepository(fornecedor_entity_1.Fornecedor);
            const telefoneRepo = queryRunner.manager.getRepository(telefone_entity_1.Telefone);
            const emailRepo = queryRunner.manager.getRepository(email_entity_1.Email);
            const pessoa = pessoaRepo.create({
                nome: createFornecedorDto.nome,
                cpfCnpj: createFornecedorDto.cpfCnpj,
                idCidade: createFornecedorDto.endereco.idCidade,
            });
            const novaPessoa = await queryRunner.manager.save(pessoa);
            const fornecedor = fornecedorRepo.create({ idPessoa: novaPessoa.id });
            const novoFornecedor = await queryRunner.manager.save(fornecedor);
            const endereco = enderecoRepo.create({ ...createFornecedorDto.endereco, idPessoa: novaPessoa.id });
            await queryRunner.manager.save(endereco);
            for (const tel of createFornecedorDto.telefones) {
                if (tel.numero) {
                    const telefone = telefoneRepo.create({ ...tel, idPessoa: novaPessoa.id });
                    await queryRunner.manager.save(telefone);
                }
            }
            for (const mail of createFornecedorDto.emails) {
                if (mail.email) {
                    const email = emailRepo.create({ ...mail, idPessoa: novaPessoa.id });
                    await queryRunner.manager.save(email);
                }
            }
            await queryRunner.commitTransaction();
            return this.findOne(novoFornecedor.id);
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
        return this.fornecedorRepository.find({ relations: ['pessoa', 'pessoa.cidade'] });
    }
    async findOne(id) {
        const fornecedor = await this.fornecedorRepository.findOne({ where: { id }, relations: ['pessoa', 'pessoa.cidade'] });
        if (!fornecedor) {
            throw new common_1.NotFoundException(`Fornecedor com o ID #${id} não encontrado.`);
        }
        return fornecedor;
    }
    async update(id, updateFornecedorDto) {
        const fornecedor = await this.findOne(id);
        const pessoaAtualizada = await this.pessoaRepository.preload({
            id: fornecedor.idPessoa,
            ...updateFornecedorDto,
        });
        if (!pessoaAtualizada) {
            throw new common_1.NotFoundException(`Pessoa associada ao fornecedor #${id} não foi encontrada para atualização.`);
        }
        await this.pessoaRepository.save(pessoaAtualizada);
        return this.findOne(id);
    }
    async remove(id) {
        const fornecedor = await this.findOne(id);
        await this.fornecedorRepository.remove(fornecedor);
        await this.pessoaRepository.delete(fornecedor.idPessoa);
    }
};
exports.FornecedoresService = FornecedoresService;
exports.FornecedoresService = FornecedoresService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(fornecedor_entity_1.Fornecedor)),
    __param(1, (0, typeorm_1.InjectRepository)(pessoa_entity_1.Pessoa)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], FornecedoresService);
//# sourceMappingURL=fornecedores.service.js.map