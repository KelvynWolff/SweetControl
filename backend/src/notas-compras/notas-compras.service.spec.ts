import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotasComprasService } from './notas-compras.service';
import { NotasCompras } from './entities/notas-compras.entity';
import { DataSource } from 'typeorm';
import { FornecedoresService } from '../fornecedores/fornecedores.service';

describe('NotasComprasService', () => {
  let service: NotasComprasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotasComprasService,
        { provide: getRepositoryToken(NotasCompras), useValue: {} },
        { provide: DataSource, useValue: { createQueryRunner: jest.fn() } },
        { provide: FornecedoresService,useValue: {create: jest.fn()}},
      ],
    }).compile();

    service = module.get<NotasComprasService>(NotasComprasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});