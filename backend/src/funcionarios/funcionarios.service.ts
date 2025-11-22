import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Funcionario } from './entities/funcionario.entity';
import { Pessoa } from '../pessoas/entities/pessoa.entity';
import { Endereco } from '../enderecos/entities/endereco.entity';
import { Telefone } from '../telefones/entities/telefone.entity';
import { Email } from '../emails/entities/email.entity';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';

@Injectable()
export class FuncionariosService {
  constructor(
    @InjectRepository(Funcionario)
    private readonly funcionarioRepository: Repository<Funcionario>,
    @InjectRepository(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>,
    private dataSource: DataSource,
  ) {}

  async create(createFuncionarioDto: CreateFuncionarioDto): Promise<Funcionario> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const pessoaRepo = queryRunner.manager.getRepository(Pessoa);
      const enderecoRepo = queryRunner.manager.getRepository(Endereco);
      const funcionarioRepo = queryRunner.manager.getRepository(Funcionario);
      const telefoneRepo = queryRunner.manager.getRepository(Telefone);
      const emailRepo = queryRunner.manager.getRepository(Email);

      let pessoa = await pessoaRepo.findOne({ 
        where: { cpfCnpj: createFuncionarioDto.cpfCnpj } 
      });

      if (pessoa) {
        pessoa.nome = createFuncionarioDto.nome;
        await pessoaRepo.save(pessoa);
      } else {
        const novaPessoa = pessoaRepo.create({
          nome: createFuncionarioDto.nome,
          cpfCnpj: createFuncionarioDto.cpfCnpj,
          idCidade: createFuncionarioDto.endereco.idCidade,
        });
        pessoa = await pessoaRepo.save(novaPessoa);
      }

      let endereco = await enderecoRepo.findOne({ where: { idPessoa: pessoa.id } });
      if (endereco) {
        enderecoRepo.merge(endereco, {
             ...createFuncionarioDto.endereco, 
             idCidade: createFuncionarioDto.endereco.idCidade 
        });
        await enderecoRepo.save(endereco);
      } else {
        const novoEndereco = enderecoRepo.create({
            ...createFuncionarioDto.endereco,
            idPessoa: pessoa.id
        });
        await enderecoRepo.save(novoEndereco);
      }

      let funcionario = await funcionarioRepo.findOne({ where: { idPessoa: pessoa.id } });
      
      if (funcionario) {
        funcionario.dataAdmissao = createFuncionarioDto.dataAdmissao;
        funcionario.dataRecisao = null; 
        await funcionarioRepo.save(funcionario);
      } else {
        const novoFuncionario = funcionarioRepo.create({
          idPessoa: pessoa.id,
          dataAdmissao: createFuncionarioDto.dataAdmissao,
          dataRecisao: null,
        });
        funcionario = await funcionarioRepo.save(novoFuncionario);
      }

      await telefoneRepo.delete({ idPessoa: pessoa.id });
      for (const tel of createFuncionarioDto.telefones) {
        if (tel.numero) {
          const telefone = telefoneRepo.create({ ...tel, idPessoa: pessoa.id });
          await queryRunner.manager.save(telefone);
        }
      }

      await emailRepo.delete({ idPessoa: pessoa.id });
      for (const mail of createFuncionarioDto.emails) {
        if (mail.email) {
          const email = emailRepo.create({ ...mail, idPessoa: pessoa.id });
          await queryRunner.manager.save(email);
        }
      }

      await queryRunner.commitTransaction();
      return this.findOne(funcionario.id);

    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  findAll(): Promise<Funcionario[]> {
    return this.funcionarioRepository.find({ 
        relations: ['pessoa', 'pessoa.cidade', 'usuario'] 
    });
  }

  async findOne(id: number): Promise<Funcionario> {
    const funcionario = await this.funcionarioRepository.findOne({ 
        where: { id }, 
        relations: [
            'pessoa', 
            'pessoa.cidade', 
            'pessoa.enderecos',
            'pessoa.enderecos.cidade', 
            'pessoa.telefones', 
            'pessoa.emails', 
            'usuario'
        ] 
    });
    if (!funcionario) {
      throw new NotFoundException(`Funcionário com o ID #${id} não encontrado.`);
    }
    return funcionario;
  }
  
  async update(id: number, updateFuncionarioDto: UpdateFuncionarioDto): Promise<Funcionario> {
    const funcionario = await this.findOne(id);
    
    const pessoaAtualizada = await this.pessoaRepository.preload({
        id: funcionario.idPessoa,
        nome: updateFuncionarioDto.nome,
    });
    
    if (pessoaAtualizada) {
        await this.pessoaRepository.save(pessoaAtualizada);
    }

    const funcionarioAtualizado = await this.funcionarioRepository.preload({
        id: id,
        dataAdmissao: updateFuncionarioDto.dataAdmissao,
        dataRecisao: updateFuncionarioDto.dataRecisao,
    });
    
    if (!funcionarioAtualizado) {
        throw new NotFoundException(`Funcionário com o ID #${id} não foi encontrado para atualização.`);
    }
    await this.funcionarioRepository.save(funcionarioAtualizado);

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const funcionario = await this.findOne(id);
    await this.funcionarioRepository.remove(funcionario);
  }
}