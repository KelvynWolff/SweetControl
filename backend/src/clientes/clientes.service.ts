import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { Pessoa } from '../pessoas/entities/pessoa.entity';
import { Endereco } from '../enderecos/entities/endereco.entity';
import { Telefone } from '../telefones/entities/telefone.entity';
import { Email } from '../emails/entities/email.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    @InjectRepository(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>,
    private dataSource: DataSource,
  ) {}

    async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
        const pessoaRepo = queryRunner.manager.getRepository(Pessoa);
        const enderecoRepo = queryRunner.manager.getRepository(Endereco);
        const clienteRepo = queryRunner.manager.getRepository(Cliente);
        const telefoneRepo = queryRunner.manager.getRepository(Telefone);
        const emailRepo = queryRunner.manager.getRepository(Email);
        
        const pessoa = pessoaRepo.create({
            nome: createClienteDto.nome,
            cpfCnpj: createClienteDto.cpfCnpj,
            idCidade: createClienteDto.endereco.idCidade,
        });
        const novaPessoa = await queryRunner.manager.save(pessoa);

        const cliente = clienteRepo.create({ idPessoa: novaPessoa.id });
        const novoCliente = await queryRunner.manager.save(cliente);

        const endereco = enderecoRepo.create({
            ...createClienteDto.endereco,
            idPessoa: novaPessoa.id,
        });
        await queryRunner.manager.save(endereco);

        for (const tel of createClienteDto.telefones) {
            if (tel.numero) {
            const telefone = telefoneRepo.create({ ...tel, idPessoa: novaPessoa.id });
            await queryRunner.manager.save(telefone);
            }
        }
        
        for (const mail of createClienteDto.emails) {
            if (mail.email) {
            const email = emailRepo.create({ ...mail, idPessoa: novaPessoa.id });
            await queryRunner.manager.save(email);
            }
        }

        await queryRunner.commitTransaction();
        return this.findOne(novoCliente.id);
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

  findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find({
      relations: ['pessoa', 'pessoa.cidade', 'pessoa.enderecos', 'pessoa.telefones', 'pessoa.emails'],
    });
  }

  async findOne(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne({
      where: { id },
      relations: ['pessoa', 'pessoa.cidade', 'pessoa.enderecos', 'pessoa.telefones', 'pessoa.emails'],
    });
    if (!cliente) {
      throw new NotFoundException(`Cliente com o ID #${id} não encontrado.`);
    }
    return cliente;
  }

  async update(id: number, updateClienteDto: UpdateClienteDto): Promise<Cliente> {
    const cliente = await this.findOne(id);
    
    const pessoaAtualizada = await this.pessoaRepository.preload({
      id: cliente.idPessoa,
      ...updateClienteDto,
    });
    if (!pessoaAtualizada) {
      throw new NotFoundException(`Pessoa associada ao cliente #${id} não encontrada.`);
    }
    await this.pessoaRepository.save(pessoaAtualizada);

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const cliente = await this.findOne(id);
    await this.clienteRepository.remove(cliente);
    await this.pessoaRepository.delete(cliente.idPessoa);
  }
}