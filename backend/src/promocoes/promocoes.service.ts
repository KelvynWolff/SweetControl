import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Promocao } from './entities/promocao.entity';
import { CreatePromocaoDto } from './dto/create-promocao.dto';
import { UpdatePromocaoDto } from './dto/update-promocao.dto';

@Injectable()
export class PromocoesService {
  constructor(
    @InjectRepository(Promocao)
    private readonly promocaoRepository: Repository<Promocao>,
  ) {}

  create(createPromocaoDto: CreatePromocaoDto): Promise<Promocao> {
    const promocao = this.promocaoRepository.create(createPromocaoDto);
    return this.promocaoRepository.save(promocao);
  }

  findAll(): Promise<Promocao[]> {
    return this.promocaoRepository.find({ relations: ['produto'] });
  }

  async findOne(id: number): Promise<Promocao> {
    const promocao = await this.promocaoRepository.findOne({ where: { id }, relations: ['produto'] });
    if (!promocao) {
      throw new NotFoundException(`Promoção com o ID #${id} não encontrada.`);
    }
    return promocao;
  }

  async update(id: number, updatePromocaoDto: UpdatePromocaoDto): Promise<Promocao> {
    const promocao = await this.promocaoRepository.preload({
      id: id,
      ...updatePromocaoDto,
    });
    if (!promocao) {
      throw new NotFoundException(`Promoção com o ID #${id} não encontrada para atualização.`);
    }
    return this.promocaoRepository.save(promocao);
  }

  async remove(id: number): Promise<void> {
    const promocao = await this.findOne(id);
    await this.promocaoRepository.remove(promocao);
  }
}