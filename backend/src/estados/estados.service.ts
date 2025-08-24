import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estado } from './entities/estado.entity';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';

@Injectable()
export class EstadosService {
  constructor(
    @InjectRepository(Estado)
    private readonly estadoRepository: Repository<Estado>,
  ) {}

  create(createEstadoDto: CreateEstadoDto): Promise<Estado> {
    const estado = this.estadoRepository.create(createEstadoDto);
    return this.estadoRepository.save(estado);
  }

  findAll(): Promise<Estado[]> {
    return this.estadoRepository.find();
  }

  async findOne(sigla: string): Promise<Estado> {
    const estado = await this.estadoRepository.findOneBy({ sigla });
    if (!estado) {
      throw new NotFoundException(`Estado com a sigla "${sigla}" não encontrado.`);
    }
    return estado;
  }

  async update(sigla: string, updateEstadoDto: UpdateEstadoDto): Promise<Estado> {
    const estado = await this.estadoRepository.preload({
      sigla: sigla,
      nome: updateEstadoDto.nome,
    });
    if (!estado) {
      throw new NotFoundException(`Estado com a sigla "${sigla}" não encontrado para atualização.`);
    }
    return this.estadoRepository.save(estado);
  }

  async remove(sigla: string): Promise<void> {
    const estado = await this.findOne(sigla);
    await this.estadoRepository.remove(estado);
  }
}