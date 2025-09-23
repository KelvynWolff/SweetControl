import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProducaoService } from './producao.service';
import { CreateProducaoDto } from './dto/create-producao.dto';

@Controller('producao')
export class ProducaoController {
  constructor(private readonly producaoService: ProducaoService) {}

  @Post()
  create(@Body() createProducaoDto: CreateProducaoDto) {
    return this.producaoService.create(createProducaoDto);
  }

  @Get()
  findAll() {
    return this.producaoService.findAll();
  }
}