import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PedidosService } from './pedidos.service';
import { Pedido } from './entities/pedido.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';

const mockPedidoRepository = {
  create: jest.fn(),
  save: jest.fn(),
};

describe('PedidosService', () => {
  let service: PedidosService;
  let repository: Repository<Pedido>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PedidosService,
        {
          provide: getRepositoryToken(Pedido),
          useValue: mockPedidoRepository,
        },
      ],
    }).compile();

    service = module.get<PedidosService>(PedidosService);
    repository = module.get<Repository<Pedido>>(getRepositoryToken(Pedido));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new order and return it', async () => {
      const createPedidoDto: CreatePedidoDto = {
        idCliente: 1,
        status: 'PENDENTE',
        enderecoEntrega: 'Rua Teste Unitário, 123',
        observacao: 'Observação de teste',
      };
      const expectedResult = {
        id: 1,
        data: new Date(),
        ...createPedidoDto,
      };

      mockPedidoRepository.create.mockReturnValue(createPedidoDto);
      mockPedidoRepository.save.mockReturnValue(expectedResult);

      const result = await service.create(createPedidoDto);

      expect(result).toEqual(expectedResult);
      expect(repository.create).toHaveBeenCalledWith(createPedidoDto);
      expect(repository.save).toHaveBeenCalledWith(createPedidoDto);
    });
  });
});