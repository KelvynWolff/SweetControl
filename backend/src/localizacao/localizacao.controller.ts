import { Controller, Post, Body } from '@nestjs/common';
import { LocalizacaoService } from './localizacao.service';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { CreateCidadeDto } from './dto/create-cidade.dto';
import { CreateBairroDto } from './dto/create-bairro.dto';

@Controller('localizacao')
export class LocalizacaoController {
  constructor(private readonly localizacaoService: LocalizacaoService) {}

  @Post('estados')
  createEstado(@Body() createEstadoDto: CreateEstadoDto) {
    return this.localizacaoService.createEstado(createEstadoDto);
  }

  @Post('cidades')
  createCidade(@Body() createCidadeDto: CreateCidadeDto) {
    return this.localizacaoService.createCidade(createCidadeDto);
  }

  @Post('bairros')
  createBairro(@Body() createBairroDto: CreateBairroDto) {
    return this.localizacaoService.createBairro(createBairroDto);
  }
}