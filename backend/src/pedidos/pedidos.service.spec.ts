import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PedidosService } from './pedidos.service';
import { Pedido } from './entities/pedido.entity';

describe('PedidosService', () => {
  let service: PedidosService;
  let repository: Repository<Pedido>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PedidosService,
        {
          provide: getRepositoryToken(Pedido),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PedidosService>(PedidosService);
    repository = module.get<Repository<Pedido>>(getRepositoryToken(Pedido));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});