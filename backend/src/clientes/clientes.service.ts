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

      let pessoa = await pessoaRepo.findOne({ 
        where: { cpfCnpj: createClienteDto.cpfCnpj } 
      });

      if (pessoa) {
        pessoa.nome = createClienteDto.nome;
        await pessoaRepo.save(pessoa);
      } else {
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
      } else {
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

    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find({ 
        relations: ['pessoa', 'pessoa.cidade'] 
    });
  }

  async findOne(id: number): Promise<Cliente> {
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
      throw new NotFoundException(`Cliente com o ID #${id} não encontrado.`);
    }
    return cliente;
  }
  
async update(id: number, updateClienteDto: UpdateClienteDto): Promise<Cliente> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        const cliente = await this.findOne(id);
        const idPessoa = cliente.idPessoa;

        const pessoaRepo = queryRunner.manager.getRepository(Pessoa);
        const enderecoRepo = queryRunner.manager.getRepository(Endereco);
        const telefoneRepo = queryRunner.manager.getRepository(Telefone);
        const emailRepo = queryRunner.manager.getRepository(Email);

        if (updateClienteDto.nome) {
            await pessoaRepo.update(idPessoa, { nome: updateClienteDto.nome });
        }

        if (updateClienteDto.endereco) {
            const enderecoExistente = await enderecoRepo.findOneBy({ idPessoa });
            if (enderecoExistente) {
                enderecoRepo.merge(enderecoExistente, {
                    ...updateClienteDto.endereco,
                    idCidade: updateClienteDto.endereco.idCidade
                });
                await queryRunner.manager.save(enderecoExistente);
            }
        }

        if (updateClienteDto.telefones) {
            await telefoneRepo.delete({ idPessoa });
            for (const tel of updateClienteDto.telefones) {
                if (tel.numero) {
                    const novoTel = telefoneRepo.create({ ...tel, idPessoa });
                    await queryRunner.manager.save(novoTel);
                }
            }
        }

        if (updateClienteDto.emails) {
            await emailRepo.delete({ idPessoa });
            for (const mail of updateClienteDto.emails) {
                if (mail.email) {
                    const novoEmail = emailRepo.create({ ...mail, idPessoa });
                    await queryRunner.manager.save(novoEmail);
                }
            }
        }

        await queryRunner.commitTransaction();
        return this.findOne(id);

    } catch (err) {
        await queryRunner.rollbackTransaction();
        throw err;
    } finally {
        await queryRunner.release();
    }
  }

  async remove(id: number): Promise<void> {
    const cliente = await this.findOne(id);
    await this.clienteRepository.remove(cliente);
  }
}