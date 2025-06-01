import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notificacao } from '../src/notificacoes/entities/notificacao.entity';
import { Pedido } from '../src/vendas/entities/pedido.entity';
import { Cliente } from '../src/pessoas/entities/cliente.entity';
import { Pessoa } from '../src/pessoas/entities/pessoa.entity';

describe('NotificacoesController (e2e)', () => {
  let app: INestApplication;
  let notificacaoRepository: Repository<Notificacao>;
  let pedidoRepository: Repository<Pedido>;
  let clienteRepository: Repository<Cliente>;
  let pessoaRepository: Repository<Pessoa>;
  let testPedido: Pedido;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    notificacaoRepository = moduleFixture.get(getRepositoryToken(Notificacao));
    pedidoRepository = moduleFixture.get(getRepositoryToken(Pedido));
    clienteRepository = moduleFixture.get(getRepositoryToken(Cliente));
    pessoaRepository = moduleFixture.get(getRepositoryToken(Pessoa));
  });

  beforeEach(async () => {
    await notificacaoRepository.query('DELETE FROM notificacoes;');
    await pedidoRepository.query('DELETE FROM pedidos;');
    await clienteRepository.query('DELETE FROM clientes;');
    await pessoaRepository.query('DELETE FROM pessoas;');

    const pessoa = await pessoaRepository.save({ nome: 'Pessoa para Notificacao', cpfCnpj: '33333333333' });
    const cliente = await clienteRepository.save({ pessoa });
    testPedido = await pedidoRepository.save({
      cliente,
      status: 'ENVIADO',
      enderecoEntrega: 'Rua da Notificação, 789',
      observacao: '',
    });
  });

  afterAll(async () => {
    await app.close();
  });

  it('/notificacoes (POST) - should create a new notification', () => {
    const createNotificacaoDto = {
      idPedido: testPedido.id,
      mensagem: 'Seu pedido foi faturado.',
    };

    return request(app.getHttpServer())
      .post('/notificacoes')
      .send(createNotificacaoDto)
      .expect(201)
      .then((response) => {
        expect(response.body.id).toBeDefined();
        expect(response.body.mensagem).toEqual(createNotificacaoDto.mensagem);
        expect(response.body.idPedido).toEqual(testPedido.id);
      });
  });
});