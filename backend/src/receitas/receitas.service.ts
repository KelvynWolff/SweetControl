import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Receita } from './entities/receita.entity';
import { CreateReceitaDto } from './dto/create-receita.dto';
import { UpdateReceitaDto } from './dto/update-receita.dto';

@Injectable()
export class ReceitasService {
  constructor(
    @InjectRepository(Receita)
    private readonly receitaRepository: Repository<Receita>,
  ) {}

  create(createReceitaDto: CreateReceitaDto): Promise<Receita> {
    const receita = this.receitaRepository.create(createReceitaDto);
    return this.receitaRepository.save(receita);
  }

  findAll(): Promise<Receita[]> {
    return this.receitaRepository.find({ relations: ['produto', 'insumo'] });
  }

  async findOne(id: number): Promise<Receita> {
    const receita = await this.receitaRepository.findOne({ where: { id }, relations: ['produto', 'insumo'] });
    if (!receita) {
      throw new NotFoundException(`Receita com o ID #${id} não encontrada.`);
    }
    return receita;
  }

  async update(id: number, updateReceitaDto: UpdateReceitaDto): Promise<Receita> {
    const receita = await this.receitaRepository.preload({
      id: id,
      ...updateReceitaDto,
    });
    if (!receita) {
      throw new NotFoundException(`Receita com o ID #${id} não encontrada para atualização.`);
    }
    return this.receitaRepository.save(receita);
  }

  async remove(id: number): Promise<void> {
    const receita = await this.findOne(id);
    await this.receitaRepository.remove(receita);
  }
}