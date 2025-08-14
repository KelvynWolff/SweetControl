import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProducaoService } from './producao.service';
import { Producao } from './entities/producao.entity';
import { CreateProducaoDto } from './dto/create-producao.dto';

const mockProducaoRepository = {
  create: jest.fn(),
  save: jest.fn(),
};

describe('ProducaoService', () => {
  let service: ProducaoService;
  let repository: Repository<Producao>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProducaoService,
        {
          provide: getRepositoryToken(Producao),
          useValue: mockProducaoRepository,
        },
      ],
    }).compile();

    service = module.get<ProducaoService>(ProducaoService);
    repository = module.get<Repository<Producao>>(getRepositoryToken(Producao));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new production record and return it', async () => {
      const createProducaoDto: CreateProducaoDto = {
        dataValidade: new Date().toISOString(),
        quantidade: 100,
        idCliente: 1,
        idProduto: 1,
      };
      const expectedResult = { id: 1, data: new Date(), ...createProducaoDto };

      mockProducaoRepository.create.mockReturnValue(createProducaoDto);
      mockProducaoRepository.save.mockReturnValue(expectedResult);

      const result = await service.create(createProducaoDto);

      expect(result).toEqual(expectedResult);
      expect(repository.create).toHaveBeenCalledWith(createProducaoDto);
      expect(repository.save).toHaveBeenCalledWith(createProducaoDto);
    });
  });
});