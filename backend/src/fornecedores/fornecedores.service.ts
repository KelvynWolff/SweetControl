import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Fornecedor } from './entities/fornecedor.entity';
import { Pessoa } from '../pessoas/entities/pessoa.entity';
import { Endereco } from '../enderecos/entities/endereco.entity';
import { Telefone } from '../telefones/entities/telefone.entity';
import { Email } from '../emails/entities/email.entity';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';

@Injectable()
export class FornecedoresService {
  constructor(
    @InjectRepository(Fornecedor)
    private readonly fornecedorRepository: Repository<Fornecedor>,
    @InjectRepository(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>,
    private dataSource: DataSource,
  ) {}

  async create(createFornecedorDto: CreateFornecedorDto): Promise<Fornecedor> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const pessoaRepo = queryRunner.manager.getRepository(Pessoa);
      const enderecoRepo = queryRunner.manager.getRepository(Endereco);
      const fornecedorRepo = queryRunner.manager.getRepository(Fornecedor);
      const telefoneRepo = queryRunner.manager.getRepository(Telefone);
      const emailRepo = queryRunner.manager.getRepository(Email);

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
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  findAll(): Promise<Fornecedor[]> {
    return this.fornecedorRepository.find({ relations: ['pessoa', 'pessoa.cidade'] });
  }

  async findOne(id: number): Promise<Fornecedor> {
    const fornecedor = await this.fornecedorRepository.findOne({ where: { id }, relations: ['pessoa', 'pessoa.cidade'] });
    if (!fornecedor) {
      throw new NotFoundException(`Fornecedor com o ID #${id} não encontrado.`);
    }
    return fornecedor;
  }
  
  async update(id: number, updateFornecedorDto: UpdateFornecedorDto): Promise<Fornecedor> {
    const fornecedor = await this.findOne(id);
    const pessoaAtualizada = await this.pessoaRepository.preload({
        id: fornecedor.idPessoa,
        ...updateFornecedorDto,
    });

    if (!pessoaAtualizada) {
      throw new NotFoundException(`Pessoa associada ao fornecedor #${id} não foi encontrada para atualização.`);
    }
    
    await this.pessoaRepository.save(pessoaAtualizada);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const fornecedor = await this.findOne(id);
    await this.fornecedorRepository.remove(fornecedor);
    await this.pessoaRepository.delete(fornecedor.idPessoa);
  }
}