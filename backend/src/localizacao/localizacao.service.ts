import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estado } from './entities/estado.entity';
import { Cidade } from './entities/cidade.entity';
import { Bairro } from './entities/bairro.entity';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { CreateCidadeDto } from './dto/create-cidade.dto';
import { CreateBairroDto } from './dto/create-bairro.dto';

@Injectable()
export class LocalizacaoService {
  constructor(
    @InjectRepository(Estado)
    private readonly estadoRepository: Repository<Estado>,
    @InjectRepository(Cidade)
    private readonly cidadeRepository: Repository<Cidade>,
    @InjectRepository(Bairro)
    private readonly bairroRepository: Repository<Bairro>,
  ) {}

  createEstado(createEstadoDto: CreateEstadoDto): Promise<Estado> {
    const estado = this.estadoRepository.create(createEstadoDto);
    return this.estadoRepository.save(estado);
  }

  createCidade(createCidadeDto: CreateCidadeDto): Promise<Cidade> {
    const cidade = this.cidadeRepository.create(createCidadeDto);
    return this.cidadeRepository.save(cidade);
  }

  createBairro(createBairroDto: CreateBairroDto): Promise<Bairro> {
    const bairro = this.bairroRepository.create(createBairroDto);
    return this.bairroRepository.save(bairro);
  }
}