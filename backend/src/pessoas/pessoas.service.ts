import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pessoa } from './entities/pessoa.entity';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';

@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>,
  ) {}

  create(createPessoaDto: CreatePessoaDto): Promise<Pessoa> {
    const pessoa = this.pessoaRepository.create(createPessoaDto);
    return this.pessoaRepository.save(pessoa);
  }

  findAll(): Promise<Pessoa[]> {
    return this.pessoaRepository.find({ relations: ['cidade'] });
  }

  async findOne(id: number): Promise<Pessoa> {
    const pessoa = await this.pessoaRepository.findOne({ 
      where: { id }, 
      relations: ['cidade'] 
    });
    if (!pessoa) {
      throw new NotFoundException(`Pessoa com o ID #${id} não encontrada.`);
    }
    return pessoa;
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto): Promise<Pessoa> {
    const pessoa = await this.pessoaRepository.preload({
      id: id,
      ...updatePessoaDto,
    });
    if (!pessoa) {
      throw new NotFoundException(`Pessoa com o ID #${id} não encontrada.`);
    }
    return this.pessoaRepository.save(pessoa);
  }

  async remove(id: number): Promise<void> {
    const pessoa = await this.findOne(id);
    await this.pessoaRepository.remove(pessoa);
  }
}