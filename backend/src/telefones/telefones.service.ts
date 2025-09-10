import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Telefone } from './entities/telefone.entity';
import { CreateTelefoneDto } from './dto/create-telefone.dto';
import { UpdateTelefoneDto } from './dto/update-telefone.dto';

@Injectable()
export class TelefonesService {
  constructor(
    @InjectRepository(Telefone)
    private readonly telefoneRepository: Repository<Telefone>,
  ) {}

  create(createTelefoneDto: CreateTelefoneDto): Promise<Telefone> {
    const telefone = this.telefoneRepository.create(createTelefoneDto);
    return this.telefoneRepository.save(telefone);
  }

  findAll(): Promise<Telefone[]> {
    return this.telefoneRepository.find({ relations: ['pessoa'] });
  }

  async findOne(id: number): Promise<Telefone> {
    const telefone = await this.telefoneRepository.findOne({ 
      where: { id }, 
      relations: ['pessoa'] 
    });
    if (!telefone) {
      throw new NotFoundException(`Telefone com o ID #${id} não encontrado.`);
    }
    return telefone;
  }

  async update(id: number, updateTelefoneDto: UpdateTelefoneDto): Promise<Telefone> {
    const telefone = await this.telefoneRepository.preload({
      id: id,
      ...updateTelefoneDto,
    });

    if (!telefone) {
      throw new NotFoundException(`Telefone com o ID #${id} não encontrado.`);
    }
    
    return this.telefoneRepository.save(telefone);
  }

  async remove(id: number): Promise<void> {
    const telefone = await this.findOne(id);
    await this.telefoneRepository.remove(telefone);
  }
}