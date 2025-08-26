import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TelefonesService } from './telefones.service';
import { Telefone } from './entities/telefone.entity';
import { CreateTelefoneDto } from './dto/create-telefone.dto';

const mockRepository = { create: jest.fn(), save: jest.fn() };

describe('TelefonesService', () => {
  let service: TelefonesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TelefonesService,
        { provide: getRepositoryToken(Telefone), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<TelefonesService>(TelefonesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new telefone', async () => {
    const dto: CreateTelefoneDto = { numero: '(99) 99999-9999', idPessoa: 1 };
    mockRepository.create.mockReturnValue(dto);
    mockRepository.save.mockResolvedValue({ id: 1, ...dto });
    await expect(service.create(dto)).resolves.toEqual({ id: 1, ...dto });
  });
});