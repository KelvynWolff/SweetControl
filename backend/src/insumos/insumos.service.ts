import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Insumo } from './entities/insumo.entity';
import { CreateInsumoDto } from './dto/create-insumo.dto';
import { UpdateInsumoDto } from './dto/update-insumo.dto';

@Injectable()
export class InsumosService {
  constructor(
    @InjectRepository(Insumo)
    private readonly insumoRepository: Repository<Insumo>,
  ) {}

  create(createInsumoDto: CreateInsumoDto): Promise<Insumo> {
    const insumo = this.insumoRepository.create(createInsumoDto);
    return this.insumoRepository.save(insumo);
  }

  findAll(): Promise<Insumo[]> {
    return this.insumoRepository.find();
  }

  async findOne(id: number): Promise<Insumo> {
    const insumo = await this.insumoRepository.findOneBy({ id });
    if (!insumo) {
      throw new NotFoundException(`Insumo com o ID #${id} não encontrado.`);
    }
    return insumo;
  }

  async update(id: number, updateInsumoDto: UpdateInsumoDto): Promise<Insumo> {
    const insumo = await this.insumoRepository.preload({
      id: id,
      ...updateInsumoDto,
    });
    if (!insumo) {
      throw new NotFoundException(`Insumo com o ID #${id} não encontrado para atualização.`);
    }
    return this.insumoRepository.save(insumo);
  }

  async remove(id: number): Promise<void> {
    const insumo = await this.findOne(id);
    await this.insumoRepository.remove(insumo);
  }
}