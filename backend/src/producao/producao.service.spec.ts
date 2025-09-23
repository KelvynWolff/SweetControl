import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProducaoService } from './producao.service';
import { Producao } from './entities/producao.entity';
import { DataSource } from 'typeorm';

describe('ProducaoService', () => {
  let service: ProducaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProducaoService,
        { provide: getRepositoryToken(Producao), useValue: {} },
        { provide: DataSource, useValue: { createQueryRunner: jest.fn() } },
      ],
    }).compile();

    service = module.get<ProducaoService>(ProducaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});