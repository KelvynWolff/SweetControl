import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Endereco } from './entities/endereco.entity';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';

@Injectable()
export class EnderecosService {
  constructor(
    @InjectRepository(Endereco)
    private readonly enderecoRepository: Repository<Endereco>,
  ) {}

  create(createEnderecoDto: CreateEnderecoDto): Promise<Endereco> {
    const endereco = this.enderecoRepository.create(createEnderecoDto);
    return this.enderecoRepository.save(endereco);
  }

  findAll(): Promise<Endereco[]> {
    return this.enderecoRepository.find({ relations: ['pessoa', 'bairro', 'bairro.cidade'] });
  }

  async findOne(id: number): Promise<Endereco> {
    const endereco = await this.enderecoRepository.findOne({ 
      where: { id }, 
      relations: ['pessoa', 'bairro', 'bairro.cidade'] 
    });
    if (!endereco) {
      throw new NotFoundException(`Endereço com o ID #${id} não encontrado.`);
    }
    return endereco;
  }

  async update(id: number, updateEnderecoDto: UpdateEnderecoDto): Promise<Endereco> {
    const endereco = await this.enderecoRepository.preload({
      id: id,
      ...updateEnderecoDto,
    });
    if (!endereco) {
      throw new NotFoundException(`Endereço com o ID #${id} não encontrado.`);
    }
    return this.enderecoRepository.save(endereco);
  }

  async remove(id: number): Promise<void> {
    const endereco = await this.findOne(id);
    await this.enderecoRepository.remove(endereco);
  }
}