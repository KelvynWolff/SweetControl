import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producao } from './../src/producao/entities/producao.entity';
import { Cliente } from './../src/pessoas/entities/cliente.entity';
import { Pessoa } from './../src/pessoas/entities/pessoa.entity';
import { Produto } from './../src/produtos/entities/produto.entity';

describe('ProducaoController (e2e)', () => {
  let app: INestApplication;
  let producaoRepository: Repository<Producao>;
  let clienteRepository: Repository<Cliente>;
  let pessoaRepository: Repository<Pessoa>;
  let produtoRepository: Repository<Produto>;

  let testCliente: Cliente;
  let testProduto: Produto;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    producaoRepository = moduleFixture.get(getRepositoryToken(Producao));
    clienteRepository = moduleFixture.get(getRepositoryToken(Cliente));
    pessoaRepository = moduleFixture.get(getRepositoryToken(Pessoa));
    produtoRepository = moduleFixture.get(getRepositoryToken(Produto));
  });

  beforeEach(async () => {
    await producaoRepository.query('DELETE FROM producao;');
    await clienteRepository.query('DELETE FROM clientes;');
    await pessoaRepository.query('DELETE FROM pessoas;');
    await produtoRepository.query('DELETE FROM produtos;');

    const pessoa = await pessoaRepository.save({ nome: 'Pessoa para Producao', cpfCnpj: '22222222222' });
    testCliente = await clienteRepository.save({ pessoa: pessoa });
    testProduto = await produtoRepository.save({ nome: 'Produto para Producao', unidadeMedida: 'UN', estoque: 100, custo: 10, margem: 2 });
  });

  afterAll(async () => {
    await app.close();
  });

  it('/producao (POST) - should create a new production record', () => {
    const createProducaoDto = {
      dataValidade: '2025-12-31',
      quantidade: 50,
      idCliente: testCliente.id,
      idProduto: testProduto.id,
    };

    return request(app.getHttpServer())
      .post('/producao')
      .send(createProducaoDto)
      .expect(201)
      .then((response) => {
        expect(response.body.id).toBeDefined();
        expect(response.body.quantidade).toEqual(50);
        expect(response.body.idCliente).toEqual(testCliente.id);
        expect(response.body.idProduto).toEqual(testProduto.id);
      });
  });
});