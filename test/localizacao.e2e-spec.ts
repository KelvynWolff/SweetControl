import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estado } from '../src/localizacao/entities/estado.entity';
import { Cidade } from '../src/localizacao/entities/cidade.entity';
import { Bairro } from '../src/localizacao/entities/bairro.entity';

describe('LocalizacaoController (e2e)', () => {
  let app: INestApplication;
  let estadoRepository: Repository<Estado>;
  let cidadeRepository: Repository<Cidade>;
  let bairroRepository: Repository<Bairro>;

  let testEstado: Estado;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    estadoRepository = moduleFixture.get(getRepositoryToken(Estado));
    cidadeRepository = moduleFixture.get(getRepositoryToken(Cidade));
    bairroRepository = moduleFixture.get(getRepositoryToken(Bairro));
  });

  beforeEach(async () => {
    await bairroRepository.query('DELETE FROM bairros;');
    await cidadeRepository.query('DELETE FROM cidades;');
    await estadoRepository.query('DELETE FROM estados;');

    testEstado = await estadoRepository.save({ nome: 'Estado Teste E2E', sigla: 'TE' });
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/localizacao/estados (POST)', () => {
    it('should create a new state', () => {
      const createEstadoDto = { nome: 'Santa Catarina', sigla: 'SC' };
      return request(app.getHttpServer())
        .post('/localizacao/estados')
        .send(createEstadoDto)
        .expect(201)
        .then((response) => {
          expect(response.body).toEqual({
            id: expect.any(Number),
            ...createEstadoDto,
          });
        });
    });
  });

  describe('/localizacao/cidades (POST)', () => {
    it('should create a new city linked to an existing state', () => {
      const createCidadeDto = {
        nome: 'Florianópolis',
        codigoIbge: 4205407,
        idEstado: testEstado.id,
      };
      return request(app.getHttpServer())
        .post('/localizacao/cidades')
        .send(createCidadeDto)
        .expect(201)
        .then((response) => {
          expect(response.body).toEqual({
            id: expect.any(Number),
            ...createCidadeDto,
          });
        });
    });
  });

  describe('/localizacao/bairros (POST)', () => {
    it('should create a new neighborhood linked to an existing city', async () => {
      const cidade = await cidadeRepository.save({
        nome: 'São José',
        codigoIbge: 4216602,
        estado: testEstado,
      });

      const createBairroDto = {
        nome: 'Campinas',
        idCidade: cidade.id,
      };

      return request(app.getHttpServer())
        .post('/localizacao/bairros')
        .send(createBairroDto)
        .expect(201)
        .then((response) => {
          expect(response.body).toEqual({
            id: expect.any(Number),
            ...createBairroDto,
          });
        });
    });
  });
});