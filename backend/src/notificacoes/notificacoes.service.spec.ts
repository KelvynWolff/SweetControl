import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificacoesService } from './notificacoes.service';
import { Notificacao } from './entities/notificacao.entity';
import { CreateNotificacaoDto } from './dto/create-notificacao.dto';

const mockNotificacaoRepository = {
  create: jest.fn(),
  save: jest.fn(),
};

describe('NotificacoesService', () => {
  let service: NotificacoesService;
  let repository: Repository<Notificacao>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificacoesService,
        {
          provide: getRepositoryToken(Notificacao),
          useValue: mockNotificacaoRepository,
        },
      ],
    }).compile();

    service = module.get<NotificacoesService>(NotificacoesService);
    repository = module.get<Repository<Notificacao>>(
      getRepositoryToken(Notificacao),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new notification and return it', async () => {
      const createNotificacaoDto: CreateNotificacaoDto = {
        mensagem: 'Seu pedido foi enviado!',
        idPedido: 1,
      };
      const expectedResult = {
        id: 1,
        data: new Date(),
        status_leitura: false,
        ...createNotificacaoDto,
      };

      mockNotificacaoRepository.create.mockReturnValue(createNotificacaoDto);
      mockNotificacaoRepository.save.mockReturnValue(expectedResult);

      const result = await service.create(createNotificacaoDto);

      expect(result).toEqual(expectedResult);
      expect(repository.create).toHaveBeenCalledWith(createNotificacaoDto);
      expect(repository.save).toHaveBeenCalledWith(createNotificacaoDto);
    });
  });
});