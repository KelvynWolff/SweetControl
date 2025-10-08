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

  async findAll(): Promise<any[]> {
    const insumos = await this.insumoRepository.find({
      relations: ['lotes', 'lotes.movimentacoes'],
    });

    return insumos.map(insumo => {
      const estoqueAtual = insumo.lotes.reduce((totalLote, lote) => {
        const saldoLote = lote.movimentacoes.reduce((acc, mov) => acc + mov.quantidade, 0);
        return totalLote + saldoLote;
      }, 0);
      
      const { lotes, ...result } = insumo;
      return { ...result, estoqueAtual };
    });
  }

  async findOne(id: number): Promise<any> {
    const insumo = await this.insumoRepository.findOne({ 
        where: { id },
        relations: ['lotes', 'lotes.movimentacoes'],
    });
    if (!insumo) {
      throw new NotFoundException(`Insumo com ID #${id} não encontrado.`);
    }

    const estoqueAtual = insumo.lotes.reduce((totalLote, lote) => {
        const saldoLote = lote.movimentacoes.reduce((acc, mov) => acc + mov.quantidade, 0);
        return totalLote + saldoLote;
    }, 0);
    
    return { ...insumo, estoqueAtual };
  }

  async update(id: number, updateInsumoDto: UpdateInsumoDto): Promise<Insumo> {
    const insumo = await this.insumoRepository.preload({ id, ...updateInsumoDto });
    if (!insumo) {
      throw new NotFoundException(`Insumo com ID #${id} não encontrado.`);
    }
    return this.insumoRepository.save(insumo);
  }

  async remove(id: number): Promise<void> {
    const result = await this.insumoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Insumo com o ID #${id} não encontrado.`);
    }
  }
}