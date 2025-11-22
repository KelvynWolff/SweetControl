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

      let pessoa = await pessoaRepo.findOne({ 
        where: { cpfCnpj: createFornecedorDto.cpfCnpj } 
      });

      if (pessoa) {
        pessoa.nome = createFornecedorDto.nome;
        await pessoaRepo.save(pessoa);
      } else {
        const novaPessoa = pessoaRepo.create({
          nome: createFornecedorDto.nome,
          cpfCnpj: createFornecedorDto.cpfCnpj,
          idCidade: createFornecedorDto.endereco.idCidade,
        });
        pessoa = await pessoaRepo.save(novaPessoa);
      }

      let endereco = await enderecoRepo.findOne({ where: { idPessoa: pessoa.id } });
      if (endereco) {
        enderecoRepo.merge(endereco, {
             ...createFornecedorDto.endereco, 
             idCidade: createFornecedorDto.endereco.idCidade 
        });
        await enderecoRepo.save(endereco);
      } else {
        const novoEndereco = enderecoRepo.create({
            ...createFornecedorDto.endereco,
            idPessoa: pessoa.id
        });
        await enderecoRepo.save(novoEndereco);
      }

      let fornecedor = await fornecedorRepo.findOne({ where: { idPessoa: pessoa.id } });
      
      if (!fornecedor) {
        const novoFornecedor = fornecedorRepo.create({ idPessoa: pessoa.id });
        fornecedor = await fornecedorRepo.save(novoFornecedor);
      }

      await telefoneRepo.delete({ idPessoa: pessoa.id });
      for (const tel of createFornecedorDto.telefones) {
        if (tel.numero) {
          const telefone = telefoneRepo.create({ ...tel, idPessoa: pessoa.id });
          await queryRunner.manager.save(telefone);
        }
      }

      await emailRepo.delete({ idPessoa: pessoa.id });
      for (const mail of createFornecedorDto.emails) {
        if (mail.email) {
          const email = emailRepo.create({ ...mail, idPessoa: pessoa.id });
          await queryRunner.manager.save(email);
        }
      }

      await queryRunner.commitTransaction();
      return this.findOne(fornecedor.id);

    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  findAll(): Promise<Fornecedor[]> {
    return this.fornecedorRepository.find({ 
        relations: ['pessoa', 'pessoa.cidade'] 
    });
  }

  async findOne(id: number): Promise<Fornecedor> {
    const fornecedor = await this.fornecedorRepository.findOne({ 
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
    if (!fornecedor) {
      throw new NotFoundException(`Fornecedor com o ID #${id} não encontrado.`);
    }
    return fornecedor;
  }
  
  async update(id: number, updateFornecedorDto: UpdateFornecedorDto): Promise<Fornecedor> {
    const fornecedor = await this.findOne(id);
    
    const pessoaAtualizada = await this.pessoaRepository.preload({
        id: fornecedor.idPessoa,
        nome: updateFornecedorDto.nome,
    });
    
    if (pessoaAtualizada) {
        await this.pessoaRepository.save(pessoaAtualizada);
    }

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const fornecedor = await this.findOne(id);
    await this.fornecedorRepository.remove(fornecedor);
  }
}