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
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const clienteRepo = queryRunner.manager.getRepository(Cliente);
      const pessoaRepo = queryRunner.manager.getRepository(Pessoa);
      const enderecoRepo = queryRunner.manager.getRepository(Endereco);
      const telefoneRepo = queryRunner.manager.getRepository(Telefone);
      const emailRepo = queryRunner.manager.getRepository(Email);

      const cliente = await clienteRepo.findOneBy({ id });
      if (!cliente) {
        throw new NotFoundException(`Cliente com o ID #${id} não encontrado.`);
      }
      
      const { idPessoa } = cliente;

      const dadosPessoa = {
        nome: updateClienteDto.nome,
        cpfCnpj: updateClienteDto.cpfCnpj,
        idCidade: updateClienteDto.endereco?.idCidade,
      };
      await pessoaRepo.update(idPessoa, dadosPessoa);

      if (updateClienteDto.endereco) {
        const dadosEndereco = {
          rua: updateClienteDto.endereco.rua,
          numero: updateClienteDto.endereco.numero,
          CEP: updateClienteDto.endereco.CEP,
          idBairro: updateClienteDto.endereco.idBairro,
        };
        await enderecoRepo.update({ idPessoa }, dadosEndereco);
      }
      
      if (updateClienteDto.telefones) {
        await telefoneRepo.delete({ idPessoa });
        for (const tel of updateClienteDto.telefones) {
          if (tel.numero) {
            const telefone = telefoneRepo.create({ ...tel, idPessoa });
            await queryRunner.manager.save(telefone);
          }
        }
      }

      if (updateClienteDto.emails) {
        await emailRepo.delete({ idPessoa });
        for (const mail of updateClienteDto.emails) {
          if (mail.email) {
            const email = emailRepo.create({ ...mail, idPessoa });
            await queryRunner.manager.save(email);
          }
        }
      }

      await queryRunner.commitTransaction();
      return this.findOne(id);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      console.error('ERRO NA TRANSAÇÃO DE UPDATE:', err);
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number): Promise<void> {
    const cliente = await this.findOne(id);
    await this.dataSource.transaction(async manager => {
        await manager.getRepository(Cliente).remove(cliente);
        await manager.getRepository(Pessoa).delete(cliente.idPessoa);
    });
  }
}