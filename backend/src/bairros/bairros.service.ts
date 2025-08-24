import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bairro } from './entities/bairro.entity';
import { CreateBairroDto } from './dto/create-bairro.dto';
import { UpdateBairroDto } from './dto/update-bairro.dto';

@Injectable()
export class BairrosService {
  constructor(
    @InjectRepository(Bairro)
    private readonly bairroRepository: Repository<Bairro>,
  ) {}

  create(createBairroDto: CreateBairroDto): Promise<Bairro> {
    const bairro = this.bairroRepository.create(createBairroDto);
    return this.bairroRepository.save(bairro);
  }

  findAll(): Promise<Bairro[]> {
    return this.bairroRepository.find({ relations: ['cidade'] });
  }

  async findOne(id: number): Promise<Bairro> {
    const bairro = await this.bairroRepository.findOne({ 
      where: { id }, 
      relations: ['cidade'] 
    });
    if (!bairro) {
      throw new NotFoundException(`Bairro com o ID #${id} não encontrado.`);
    }
    return bairro;
  }

  async update(id: number, updateBairroDto: UpdateBairroDto): Promise<Bairro> {
    const bairro = await this.bairroRepository.preload({
      id: id,
      ...updateBairroDto,
    });
    if (!bairro) {
      throw new NotFoundException(`Bairro com o ID #${id} não encontrado.`);
    }
    return this.bairroRepository.save(bairro);
  }

  async remove(id: number): Promise<void> {
    const bairro = await this.findOne(id);
    await this.bairroRepository.remove(bairro);
  }
}