import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../backend/src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Pessoa } from '../backend/src/pessoas/entities/pessoa.entity';
import { Repository } from 'typeorm';

describe('PessoasController (e2e)', () => {
  let app: INestApplication;
  let pessoaRepository: Repository<Pessoa>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe());

    await app.init();

    pessoaRepository = moduleFixture.get<Repository<Pessoa>>(
      getRepositoryToken(Pessoa),
    );

    await pessoaRepository.query('DELETE FROM pessoas;');
  });

  afterEach(async () => {
    await app.close();
  });

  it('/pessoas (POST) - should create a new person', () => {
    const createPessoaDto = {
      nome: 'Pessoa E2E Teste',
      cpfCnpj: '11122233344',
    };

    return request(app.getHttpServer())
      .post('/pessoas')
      .send(createPessoaDto)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual({
          id: expect.any(Number),
          nome: createPessoaDto.nome,
          cpfCnpj: createPessoaDto.cpfCnpj,
        });
      });
  });

  it('/pessoas (POST) - should return a bad request for invalid data', () => {
    const invalidDto = {
      cpfCnpj: '11122233344',
    };

    return request(app.getHttpServer())
      .post('/pessoas')
      .send(invalidDto)
      .expect(400);
  });
});