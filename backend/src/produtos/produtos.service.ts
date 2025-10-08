import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './entities/produto.entity';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Lote } from '../lotes/entities/lote.entity';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
  ) {}

  create(createProdutoDto: CreateProdutoDto): Promise<Produto> {
    const produto = this.produtoRepository.create(createProdutoDto);
    return this.produtoRepository.save(produto);
  }

  async findAll(): Promise<any[]> {
    const produtos = await this.produtoRepository.find({
      relations: ['lotes', 'lotes.movimentacoes'],
    });

    return produtos.map(produto => {
      const estoqueAtual = produto.lotes.reduce((totalLote, lote) => {
        const saldoLote = lote.movimentacoes.reduce((acc, mov) => acc + mov.quantidade, 0);
        return totalLote + saldoLote;
      }, 0);
      
      const { lotes, ...result } = produto;
      return { ...result, estoqueAtual };
    });
  }

  async findOne(id: number): Promise<any> {
    const produto = await this.produtoRepository.findOne({ 
        where: { id },
        relations: ['lotes', 'lotes.movimentacoes'],
    });
    if (!produto) {
      throw new NotFoundException(`Produto com ID #${id} não encontrado.`);
    }

    const estoqueAtual = produto.lotes.reduce((totalLote, lote) => {
        const saldoLote = lote.movimentacoes.reduce((acc, mov) => acc + mov.quantidade, 0);
        return totalLote + saldoLote;
    }, 0);
    
    return { ...produto, estoqueAtual };
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto): Promise<Produto> {
    const produto = await this.produtoRepository.preload({ id, ...updateProdutoDto });
    if (!produto) {
      throw new NotFoundException(`Produto com ID #${id} não encontrado.`);
    }
    return this.produtoRepository.save(produto);
  }

  async remove(id: number): Promise<void> {
    const produto = await this.findOne(id);
    await this.produtoRepository.remove(produto as Produto);
  }
}