"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotasComprasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const notas_compras_entity_1 = require("./entities/notas-compras.entity");
const itens_notas_compras_entity_1 = require("../itens-notas-compras/entities/itens-notas-compras.entity");
const lote_entity_1 = require("../lotes/entities/lote.entity");
const movimentacao_estoque_entity_1 = require("../movimentacao-estoque/entities/movimentacao-estoque.entity");
const common_2 = require("@nestjs/common");
const xml2js_1 = require("xml2js");
const fornecedor_entity_1 = require("../fornecedores/entities/fornecedor.entity");
const fornecedores_service_1 = require("../fornecedores/fornecedores.service");
const produto_entity_1 = require("../produtos/entities/produto.entity");
const insumo_entity_1 = require("../insumos/entities/insumo.entity");
const cidade_entity_1 = require("../cidades/entities/cidade.entity");
const bairro_entity_1 = require("../bairros/entities/bairro.entity");
const estado_entity_1 = require("../estados/entities/estado.entity");
const pessoa_entity_1 = require("../pessoas/entities/pessoa.entity");
let NotasComprasService = class NotasComprasService {
    dataSource;
    fornecedoresService;
    constructor(dataSource, fornecedoresService) {
        this.dataSource = dataSource;
        this.fornecedoresService = fornecedoresService;
    }
    async create(createNotaCompraDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const notaRepo = queryRunner.manager.getRepository(notas_compras_entity_1.NotasCompras);
            const loteRepo = queryRunner.manager.getRepository(lote_entity_1.Lote);
            const movEstoqueRepo = queryRunner.manager.getRepository(movimentacao_estoque_entity_1.MovimentacaoEstoque);
            const itemNotaRepo = queryRunner.manager.getRepository(itens_notas_compras_entity_1.ItensNotasCompras);
            const nota = notaRepo.create(createNotaCompraDto);
            const novaNota = await queryRunner.manager.save(nota);
            for (const itemDto of createNotaCompraDto.itens) {
                let loteParaMovimentacao;
                const loteExistente = await loteRepo.findOneBy({ codigoLote: itemDto.codigoLote });
                if (loteExistente) {
                    const isProdutoMatch = itemDto.idProduto && loteExistente.idProduto === itemDto.idProduto;
                    const isInsumoMatch = itemDto.idInsumo && loteExistente.idInsumo === itemDto.idInsumo;
                    if (!isProdutoMatch && !isInsumoMatch) {
                        throw new common_1.UnprocessableEntityException(`O Lote ${itemDto.codigoLote} já existe, mas está associado a um produto ou insumo diferente.`);
                    }
                    loteParaMovimentacao = loteExistente;
                }
                else {
                    if (!itemDto.dataValidade) {
                        throw new common_1.BadRequestException(`A data de validade é obrigatória para criar o novo lote ${itemDto.codigoLote}.`);
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
                    tipo: movimentacao_estoque_entity_1.TipoMovimentacao.ENTRADA_COMPRA,
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
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async processXml(xmlBuffer) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const xmlString = xmlBuffer.toString('utf-8');
            const parsedXml = await (0, xml2js_1.parseStringPromise)(xmlString);
            const infNFe = parsedXml.nfeProc.NFe[0].infNFe[0];
            const fornecedorRepo = queryRunner.manager.getRepository(fornecedor_entity_1.Fornecedor);
            const pessoaRepo = queryRunner.manager.getRepository(pessoa_entity_1.Pessoa);
            const estadoRepo = queryRunner.manager.getRepository(estado_entity_1.Estado);
            const cidadeRepo = queryRunner.manager.getRepository(cidade_entity_1.Cidade);
            const bairroRepo = queryRunner.manager.getRepository(bairro_entity_1.Bairro);
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
            let bairro = await bairroRepo.findOne({ where: { nome: nomeBairroXml, ibgeCidade: codCidadeXml } });
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
            const produtoRepo = queryRunner.manager.getRepository(produto_entity_1.Produto);
            const insumoRepo = queryRunner.manager.getRepository(insumo_entity_1.Insumo);
            const itens = await Promise.all(infNFe.det.map(async (item) => {
                const prod = item.prod[0];
                const nomeItem = prod.xProd[0];
                let itemEncontrado = await produtoRepo.findOne({ where: { nome: nomeItem } });
                let tipo = 'produto';
                if (!itemEncontrado) {
                    itemEncontrado = await insumoRepo.findOne({ where: { nome: nomeItem } });
                    if (itemEncontrado)
                        tipo = 'insumo';
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
                    codigoLote: rastro ? rastro.nLote[0] : `LOTE-${Date.now()}-${Math.floor(Math.random() * 100)}`,
                    dataValidade: rastro ? rastro.dVal[0] : new Date().toISOString().split('T')[0],
                };
            }));
            await queryRunner.commitTransaction();
            const produtosAtualizados = await this.dataSource.getRepository(produto_entity_1.Produto).find();
            const insumosAtualizados = await this.dataSource.getRepository(insumo_entity_1.Insumo).find();
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
        }
        catch (error) {
            if (queryRunner.isTransactionActive)
                await queryRunner.rollbackTransaction();
            console.error("Erro ao processar XML:", error);
            throw new common_1.BadRequestException(error.message || 'XML inválido ou mal formatado.');
        }
        finally {
            await queryRunner.release();
        }
    }
    findAll() {
        return this.dataSource.getRepository(notas_compras_entity_1.NotasCompras).find({
            relations: ['fornecedor', 'fornecedor.pessoa', 'itens', 'itens.produto', 'itens.insumo'],
            order: { data: 'DESC' }
        });
    }
    async findOne(id) {
        const nota = await this.dataSource.getRepository(notas_compras_entity_1.NotasCompras).findOne({
            where: { id },
            relations: ['fornecedor', 'fornecedor.pessoa', 'itens', 'itens.produto', 'itens.insumo'],
        });
        if (!nota) {
            throw new common_2.NotFoundException(`Nota de Compra com o ID #${id} não encontrada.`);
        }
        return nota;
    }
    async remove(id) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const notaRepo = queryRunner.manager.getRepository(notas_compras_entity_1.NotasCompras);
            const movEstoqueRepo = queryRunner.manager.getRepository(movimentacao_estoque_entity_1.MovimentacaoEstoque);
            const nota = await notaRepo.findOne({
                where: { id },
                relations: ['itens', 'itens.lote'],
            });
            if (!nota) {
                throw new common_2.NotFoundException(`Nota de Compra com o ID #${id} não encontrada.`);
            }
            for (const item of nota.itens) {
                if (!item.lote)
                    continue;
                const movimentacoesAnteriores = await movEstoqueRepo.find({
                    where: { lote: { id: item.lote.id }, tipo: movimentacao_estoque_entity_1.TipoMovimentacao.ENTRADA_COMPRA }
                });
                const movimentacaoParaReverter = movimentacoesAnteriores.find(m => m.idLote === item.lote.id);
                if (movimentacaoParaReverter) {
                    const movimentacaoReversa = movEstoqueRepo.create({
                        idLote: item.lote.id,
                        tipo: movimentacao_estoque_entity_1.TipoMovimentacao.PERDA,
                        quantidade: -item.quantidade,
                    });
                    await queryRunner.manager.save(movimentacaoReversa);
                }
            }
            await queryRunner.manager.remove(nota);
            await queryRunner.commitTransaction();
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
};
exports.NotasComprasService = NotasComprasService;
exports.NotasComprasService = NotasComprasService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        fornecedores_service_1.FornecedoresService])
], NotasComprasService);
//# sourceMappingURL=notas-compras.service.js.map