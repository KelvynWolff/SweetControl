import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producao } from './entities/producao.entity';
import { CreateProducaoDto } from './dto/create-producao.dto';

@Injectable()
export class ProducaoService {
  constructor(
    @InjectRepository(Producao)
    private readonly producaoRepository: Repository<Producao>,
  ) {}

  create(createProducaoDto: CreateProducaoDto): Promise<Producao> {
    const producao = this.producaoRepository.create(createProducaoDto);
    return this.producaoRepository.save(producao);
  }
}