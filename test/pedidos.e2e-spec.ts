import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './../src/vendas/entities/pedido.entity';
import { Cliente } from './../src/pessoas/entities/cliente.entity';
import { Pessoa } from './../src/pessoas/entities/pessoa.entity';

describe('PedidosController (e2e)', () => {
  let app: INestApplication;
  let pedidoRepository: Repository<Pedido>;
  let clienteRepository: Repository<Cliente>;
  let pessoaRepository: Repository<Pessoa>;
  let testCliente: Cliente;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    pedidoRepository = moduleFixture.get<Repository<Pedido>>(getRepositoryToken(Pedido));
    clienteRepository = moduleFixture.get<Repository<Cliente>>(getRepositoryToken(Cliente));
    pessoaRepository = moduleFixture.get<Repository<Pessoa>>(getRepositoryToken(Pessoa));

    await pedidoRepository.query('DELETE FROM pedidos;');
    await clienteRepository.query('DELETE FROM clientes;');
    await pessoaRepository.query('DELETE FROM pessoas;');

    const pessoa = await pessoaRepository.save({ nome: 'Pessoa para Pedido', cpfCnpj: '11111111111' });
    testCliente = await clienteRepository.save({ pessoa: pessoa });
  });

  afterAll(async () => {
    await app.close();
  });

  it('/pedidos (POST) - should create a new order for an existing client', () => {
    const createPedidoDto = {
      idCliente: testCliente.id,
      status: 'AGUARDANDO PAGAMENTO',
      enderecoEntrega: 'Rua do Teste E2E, 456',
      observacao: 'Pedido de teste E2E',
    };

    return request(app.getHttpServer())
      .post('/pedidos')
      .send(createPedidoDto)
      .expect(201)
      .then((response) => {
        expect(response.body.id).toBeDefined();
        expect(response.body.status).toEqual(createPedidoDto.status);
        expect(response.body.idCliente).toEqual(createPedidoDto.idCliente);
      });
  });

  it('/pedidos (POST) - should fail if client does not exist', () => {
    const createPedidoDtoWithInvalidClient = {
      idCliente: 99999,
      status: 'FALHA',
      enderecoEntrega: 'Rua da Falha, 0',
      observacao: 'Este pedido deve falhar',
    };

    return request(app.getHttpServer())
      .post('/pedidos')
      .send(createPedidoDtoWithInvalidClient)
      .expect(500);
  });
});