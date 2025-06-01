import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Produto } from './../src/produtos/entities/produto.entity';
import { Repository } from 'typeorm';

describe('ProdutosController (e2e)', () => {
  let app: INestApplication;
  let produtoRepository: Repository<Produto>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    produtoRepository = moduleFixture.get<Repository<Produto>>(
      getRepositoryToken(Produto),
    );
    
    await produtoRepository.query('DELETE FROM produtos;');
  });

  afterEach(async () => {
    await app.close();
  });

  it('/produtos (POST) - should create a new product', () => {
    const createProdutoDto = {
        nome: 'Produto E2E',
        unidadeMedida: 'KG',
        estoque: 100,
        custo: 25,
        margem: 2.0,
    };

    return request(app.getHttpServer())
      .post('/produtos')
      .send(createProdutoDto)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual({
          id: expect.any(Number),
          ...createProdutoDto,
          descricao: null,
        });
      });
  });
});