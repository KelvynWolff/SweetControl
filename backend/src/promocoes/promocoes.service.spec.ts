import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PromocoesService } from './promocoes.service';
import { Promocao } from './entities/promocao.entity';
import { CreatePromocaoDto } from './dto/create-promocao.dto';

const mockPromocaoRepository = {
  create: jest.fn(),
  save: jest.fn(),
};

describe('PromocoesService', () => {
  let service: PromocoesService;
  let repository: Repository<Promocao>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PromocoesService,
        {
          provide: getRepositoryToken(Promocao),
          useValue: mockPromocaoRepository,
        },
      ],
    }).compile();

    service = module.get<PromocoesService>(PromocoesService);
    repository = module.get<Repository<Promocao>>(getRepositoryToken(Promocao));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new promocao and return it', async () => {
      const createPromocaoDto: CreatePromocaoDto = {
        nome: 'Promoção de Verão',
        tipoDeDesconto: 'Percentual',
        valor: 10,
        dataInicio: new Date('2025-01-01'),
        dataFim: new Date('2025-01-31'),
        idProduto: 1,
      };
      
      const expectedResult = { id: 1, ...createPromocaoDto };

      mockPromocaoRepository.create.mockReturnValue(createPromocaoDto);
      mockPromocaoRepository.save.mockResolvedValue(expectedResult);

      const result = await service.create(createPromocaoDto);

      expect(result).toEqual(expectedResult);
      expect(repository.create).toHaveBeenCalledWith(createPromocaoDto);
      expect(repository.save).toHaveBeenCalledWith(createPromocaoDto);
    });
  });
});