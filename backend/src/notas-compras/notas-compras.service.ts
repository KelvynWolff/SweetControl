import { Injectable, BadRequestException, UnprocessableEntityException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { NotasCompras } from './entities/notas-compras.entity';
import { ItensNotasCompras } from '../itens-notas-compras/entities/itens-notas-compras.entity';
import { Lote } from '../lotes/entities/lote.entity';
import { MovimentacaoEstoque, TipoMovimentacao } from '../movimentacao-estoque/entities/movimentacao-estoque.entity';
import { CreateNotaCompraDto } from './dto/create-nota-compra.dto';
import { NotFoundException } from '@nestjs/common';
import { parseStringPromise } from 'xml2js';
import { Fornecedor } from '../fornecedores/entities/fornecedor.entity';
import { FornecedoresService } from '../fornecedores/fornecedores.service';
import { Produto } from '../produtos/entities/produto.entity';
import { Insumo } from '../insumos/entities/insumo.entity';
import { Cidade } from '../cidades/entities/cidade.entity';
import { Bairro } from '../bairros/entities/bairro.entity';
import { Estado } from '../estados/entities/estado.entity';
import { Pessoa } from '../pessoas/entities/pessoa.entity';

@Injectable()
export class NotasComprasService {
  constructor(
    private dataSource: DataSource,
    private fornecedoresService: FornecedoresService,
  ) {}

async create(createNotaCompraDto: CreateNotaCompraDto): Promise<NotasCompras> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const notaRepo = queryRunner.manager.getRepository(NotasCompras);
      const loteRepo = queryRunner.manager.getRepository(Lote);
      const movEstoqueRepo = queryRunner.manager.getRepository(MovimentacaoEstoque);
      const itemNotaRepo = queryRunner.manager.getRepository(ItensNotasCompras);

      const nota = notaRepo.create(createNotaCompraDto);
      const novaNota = await queryRunner.manager.save(nota);

      for (const itemDto of createNotaCompraDto.itens) {
        let loteParaMovimentacao: Lote;
        const loteExistente = await loteRepo.findOneBy({ codigoLote: itemDto.codigoLote });

        if (loteExistente) {
          const isProdutoMatch = itemDto.idProduto && loteExistente.idProduto === itemDto.idProduto;
          const isInsumoMatch = itemDto.idInsumo && loteExistente.idInsumo === itemDto.idInsumo;

          if (!isProdutoMatch && !isInsumoMatch) {
            throw new UnprocessableEntityException(
              `O Lote ${itemDto.codigoLote} já existe, mas está associado a um produto ou insumo diferente.`
            );
          }
          loteParaMovimentacao = loteExistente;
        } else {
          if (!itemDto.dataValidade) {
            throw new BadRequestException(`A data de validade é obrigatória para criar o novo lote ${itemDto.codigoLote}.`);
          }
          const novoLote = loteRepo.create({
            codigoLote: itemDto.codigoLote,
            dataValidade: itemDto.dataValidade,
            custoUnitario: itemDto.precoCompra,
            idProduto: itemDto.idProduto,
            idInsumo: itemDto.idInsumo,
          });
          loteParaMovimentacao = await queryRunner.manager.save(novoLote);
        }

        const movimentacao = movEstoqueRepo.create({
          idLote: loteParaMovimentacao.id,
          tipo: TipoMovimentacao.ENTRADA_COMPRA,
          quantidade: itemDto.quantidade,
        });
        await queryRunner.manager.save(movimentacao);

        const itemNota = itemNotaRepo.create({
            idNotasCompras: novaNota.id,
            idProduto: itemDto.idProduto,
            idInsumo: itemDto.idInsumo,
            quantidade: itemDto.quantidade,
        });
        await queryRunner.manager.save(itemNota);
      }

      await queryRunner.commitTransaction();
      return this.findOne(novaNota.id);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

async processXml(xmlBuffer: Buffer): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const xmlString = xmlBuffer.toString('utf-8');
      const parsedXml = await parseStringPromise(xmlString);
      const infNFe = parsedXml.nfeProc.NFe[0].infNFe[0];
      
      const fornecedorRepo = queryRunner.manager.getRepository(Fornecedor);
      const pessoaRepo = queryRunner.manager.getRepository(Pessoa);
      const estadoRepo = queryRunner.manager.getRepository(Estado);
      const cidadeRepo = queryRunner.manager.getRepository(Cidade);
      const bairroRepo = queryRunner.manager.getRepository(Bairro);

      const emit = infNFe.emit[0];
      const enderEmit = emit.enderEmit[0];

      const siglaEstadoXml = enderEmit.UF[0];
      const nomeCidadeXml = enderEmit.xMun[0];
      const codCidadeXml = parseInt(enderEmit.cMun[0]);
      const nomeBairroXml = enderEmit.xBairro[0];
      
      let estado = await estadoRepo.findOneBy({ sigla: siglaEstadoXml });
      if (!estado) {
        console.log(`Estado "${siglaEstadoXml}" não encontrado. Cadastrando...`);
        estado = await queryRunner.manager.save(estadoRepo.create({ sigla: siglaEstadoXml, nome: siglaEstadoXml }));
      }
      
      let cidade = await cidadeRepo.findOneBy({ codigobge: codCidadeXml });
      if (!cidade) {
        console.log(`Cidade "${nomeCidadeXml}" não encontrada. Cadastrando...`);
        cidade = await queryRunner.manager.save(cidadeRepo.create({ codigobge: codCidadeXml, nome: nomeCidadeXml, estado: siglaEstadoXml }));
      }

      let bairro = await bairroRepo.findOne({ where: { nome: nomeBairroXml, ibgeCidade: codCidadeXml }});
      if (!bairro) {
        console.log(`Bairro "${nomeBairroXml}" não encontrado. Cadastrando...`);
        bairro = await queryRunner.manager.save(bairroRepo.create({ nome: nomeBairroXml, ibgeCidade: codCidadeXml }));
      }
      
      const cnpjFornecedor = emit.CNPJ[0];
      const nomeFornecedor = emit.xNome[0];
      let fornecedor = await fornecedorRepo.findOne({ where: { pessoa: { cpfCnpj: cnpjFornecedor } }, relations: ['pessoa'] });

      if (!fornecedor) {
        console.log(`Fornecedor com CNPJ ${cnpjFornecedor} não encontrado. Cadastrando...`);
        const novaPessoa = pessoaRepo.create({
            nome: nomeFornecedor,
            cpfCnpj: cnpjFornecedor,
            idCidade: cidade.codigobge,
        });
        const pessoaSalva = await queryRunner.manager.save(novaPessoa);

        const novoFornecedor = fornecedorRepo.create({ idPessoa: pessoaSalva.id });
        fornecedor = await queryRunner.manager.save(novoFornecedor);
      }

      const produtoRepo = queryRunner.manager.getRepository(Produto);
      const insumoRepo = queryRunner.manager.getRepository(Insumo);

      const itens = await Promise.all(infNFe.det.map(async (item) => {
        const prod = item.prod[0];
        const nomeItem = prod.xProd[0];
        
        let itemEncontrado: Produto | Insumo | null = await produtoRepo.findOne({ where: { nome: nomeItem } });
        let tipo = 'produto';

        if (!itemEncontrado) {
            itemEncontrado = await insumoRepo.findOne({ where: { nome: nomeItem } });
            if (itemEncontrado) tipo = 'insumo';
        }
        
        if (!itemEncontrado) {
            console.log(`Item "${nomeItem}" não encontrado. Cadastrando como novo insumo...`);
            const novoInsumo = insumoRepo.create({
                nome: nomeItem,
                valor: parseFloat(prod.vUnCom[0]),
                unidadeMedida: prod.uCom[0],
            });
            itemEncontrado = await queryRunner.manager.save(novoInsumo);
            tipo = 'insumo';
        }

        const rastro = prod.rastro ? prod.rastro[0] : null;

        return {
            tipo: tipo,
            itemId: itemEncontrado.id,
            nomeProduto: nomeItem,
            quantidade: parseFloat(prod.qCom[0]),
            precoCompra: parseFloat(prod.vUnCom[0]),
            codigoLote: rastro ? rastro.nLote[0] : `LOTE-${Date.now()}-${Math.floor(Math.random()*100)}`,
            dataValidade: rastro ? rastro.dVal[0] : new Date().toISOString().split('T')[0],
        };
      }));
      
      await queryRunner.commitTransaction();

      const produtosAtualizados = await this.dataSource.getRepository(Produto).find();
      const insumosAtualizados = await this.dataSource.getRepository(Insumo).find();

      return {
        dadosNota: {
          chaveAcesso: infNFe.$.Id.replace('NFe', ''),
          data: new Date(infNFe.ide[0].dhEmi[0]).toISOString().split('T')[0],
          valorTotal: parseFloat(infNFe.total[0].ICMSTot[0].vNF[0]),
          idFornecedor: fornecedor.id,
          itens,
        },
        produtos: produtosAtualizados,
        insumos: insumosAtualizados,
      };

    } catch (error) {
      if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
      console.error("Erro ao processar XML:", error);
      throw new BadRequestException(error.message || 'XML inválido ou mal formatado.');
    } finally {
        await queryRunner.release();
    }
  }

  findAll(): Promise<NotasCompras[]> {
    return this.dataSource.getRepository(NotasCompras).find({ 
        relations: ['fornecedor', 'fornecedor.pessoa', 'itens', 'itens.produto', 'itens.insumo'],
        order: { data: 'DESC' }
    });
  }

  async findOne(id: number): Promise<NotasCompras> {
    const nota = await this.dataSource.getRepository(NotasCompras).findOne({
      where: { id },
      relations: ['fornecedor', 'fornecedor.pessoa', 'itens', 'itens.produto', 'itens.insumo'],
    });
    if (!nota) {
      throw new NotFoundException(`Nota de Compra com o ID #${id} não encontrada.`);
    }
    return nota;
  }

  async remove(id: number): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const notaRepo = queryRunner.manager.getRepository(NotasCompras);
      const movEstoqueRepo = queryRunner.manager.getRepository(MovimentacaoEstoque);
      
      const nota = await notaRepo.findOne({
        where: { id },
        relations: ['itens', 'itens.lote'],
      });

      if (!nota) {
        throw new NotFoundException(`Nota de Compra com o ID #${id} não encontrada.`);
      }

      for (const item of nota.itens) {
        if (!item.lote) continue;

        const movimentacoesAnteriores = await movEstoqueRepo.find({ 
            where: { lote: { id: item.lote.id }, tipo: TipoMovimentacao.ENTRADA_COMPRA }
        });

        const movimentacaoParaReverter = movimentacoesAnteriores.find(
          m => m.idLote === item.lote.id
        );

        if (movimentacaoParaReverter) {
          const movimentacaoReversa = movEstoqueRepo.create({
            idLote: item.lote.id,
            tipo: TipoMovimentacao.PERDA,
            quantidade: -item.quantidade,
          });
          await queryRunner.manager.save(movimentacaoReversa);
        }
      }

      
      await queryRunner.manager.remove(nota);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}