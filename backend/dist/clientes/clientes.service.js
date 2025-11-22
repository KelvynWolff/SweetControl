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
exports.ClientesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cliente_entity_1 = require("./entities/cliente.entity");
const pessoa_entity_1 = require("../pessoas/entities/pessoa.entity");
const endereco_entity_1 = require("../enderecos/entities/endereco.entity");
const telefone_entity_1 = require("../telefones/entities/telefone.entity");
const email_entity_1 = require("../emails/entities/email.entity");
let ClientesService = class ClientesService {
    clienteRepository;
    pessoaRepository;
    dataSource;
    constructor(clienteRepository, pessoaRepository, dataSource) {
        this.clienteRepository = clienteRepository;
        this.pessoaRepository = pessoaRepository;
        this.dataSource = dataSource;
    }
    async create(createClienteDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const pessoaRepo = queryRunner.manager.getRepository(pessoa_entity_1.Pessoa);
            const enderecoRepo = queryRunner.manager.getRepository(endereco_entity_1.Endereco);
            const clienteRepo = queryRunner.manager.getRepository(cliente_entity_1.Cliente);
            const telefoneRepo = queryRunner.manager.getRepository(telefone_entity_1.Telefone);
            const emailRepo = queryRunner.manager.getRepository(email_entity_1.Email);
            let pessoa = await pessoaRepo.findOne({
                where: { cpfCnpj: createClienteDto.cpfCnpj }
            });
            if (pessoa) {
                pessoa.nome = createClienteDto.nome;
                await pessoaRepo.save(pessoa);
            }
            else {
                const novaPessoa = pessoaRepo.create({
                    nome: createClienteDto.nome,
                    cpfCnpj: createClienteDto.cpfCnpj,
                    idCidade: createClienteDto.endereco.idCidade,
                });
                pessoa = await pessoaRepo.save(novaPessoa);
            }
            let endereco = await enderecoRepo.findOne({ where: { idPessoa: pessoa.id } });
            if (endereco) {
                enderecoRepo.merge(endereco, {
                    ...createClienteDto.endereco,
                    idCidade: createClienteDto.endereco.idCidade
                });
                await enderecoRepo.save(endereco);
            }
            else {
                const novoEndereco = enderecoRepo.create({
                    ...createClienteDto.endereco,
                    idPessoa: pessoa.id
                });
                await enderecoRepo.save(novoEndereco);
            }
            let cliente = await clienteRepo.findOne({ where: { idPessoa: pessoa.id } });
            if (!cliente) {
                const novoCliente = clienteRepo.create({ idPessoa: pessoa.id });
                cliente = await clienteRepo.save(novoCliente);
            }
            await telefoneRepo.delete({ idPessoa: pessoa.id });
            for (const tel of createClienteDto.telefones) {
                if (tel.numero) {
                    const telefone = telefoneRepo.create({ ...tel, idPessoa: pessoa.id });
                    await queryRunner.manager.save(telefone);
                }
            }
            await emailRepo.delete({ idPessoa: pessoa.id });
            for (const mail of createClienteDto.emails) {
                if (mail.email) {
                    const email = emailRepo.create({ ...mail, idPessoa: pessoa.id });
                    await queryRunner.manager.save(email);
                }
            }
            await queryRunner.commitTransaction();
            return this.findOne(cliente.id);
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
        return this.clienteRepository.find({
            relations: ['pessoa', 'pessoa.cidade']
        });
    }
    async findOne(id) {
        const cliente = await this.clienteRepository.findOne({
            where: { id },
            relations: [
                'pessoa',
                'pessoa.cidade',
                'pessoa.enderecos',
                'pessoa.enderecos.cidade',
                'pessoa.telefones',
                'pessoa.emails'
            ]
        });
        if (!cliente) {
            throw new common_1.NotFoundException(`Cliente com o ID #${id} não encontrado.`);
        }
        return cliente;
    }
    async update(id, updateClienteDto) {
        const cliente = await this.findOne(id);
        const pessoaAtualizada = await this.pessoaRepository.preload({
            id: cliente.idPessoa,
            nome: updateClienteDto.nome,
        });
        if (pessoaAtualizada) {
            await this.pessoaRepository.save(pessoaAtualizada);
        }
        return this.findOne(id);
    }
    async remove(id) {
        const cliente = await this.findOne(id);
        await this.clienteRepository.remove(cliente);
    }
};
exports.ClientesService = ClientesService;
exports.ClientesService = ClientesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cliente_entity_1.Cliente)),
    __param(1, (0, typeorm_1.InjectRepository)(pessoa_entity_1.Pessoa)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], ClientesService);
//# sourceMappingURL=clientes.service.js.map