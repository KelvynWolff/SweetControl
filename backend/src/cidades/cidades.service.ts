import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cidade } from './entities/cidade.entity';
import { CreateCidadeDto } from './dto/create-cidade.dto';
import { UpdateCidadeDto } from './dto/update-cidade.dto';

@Injectable()
export class CidadesService {
  constructor(
    @InjectRepository(Cidade)
    private readonly cidadeRepository: Repository<Cidade>,
  ) {}

  create(createCidadeDto: CreateCidadeDto): Promise<Cidade> {
    const cidade = this.cidadeRepository.create(createCidadeDto);
    return this.cidadeRepository.save(cidade);
  }

  findAll(): Promise<Cidade[]> {
    return this.cidadeRepository.find({ relations: ['estadoRel'] });
  }

  async findOne(codigobge: number): Promise<Cidade> {
    const cidade = await this.cidadeRepository.findOne({ 
      where: { codigobge }, 
      relations: ['estadoRel'] 
    });
    if (!cidade) {
      throw new NotFoundException(`Cidade com o código IBGE #${codigobge} não encontrada.`);
    }
    return cidade;
  }

  async update(codigobge: number, updateCidadeDto: UpdateCidadeDto): Promise<Cidade> {
    const cidade = await this.cidadeRepository.preload({
      codigobge: codigobge,
      ...updateCidadeDto,
    });
    if (!cidade) {
      throw new NotFoundException(`Cidade com o código IBGE #${codigobge} não encontrada.`);
    }
    return this.cidadeRepository.save(cidade);
  }

  async remove(codigobge: number): Promise<void> {
    const cidade = await this.findOne(codigobge);
    await this.cidadeRepository.remove(cidade);
  }
}