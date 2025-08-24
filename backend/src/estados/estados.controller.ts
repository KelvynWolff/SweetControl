import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadosService } from './estados.service';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';

@Controller('estados')
export class EstadosController {
  constructor(private readonly estadosService: EstadosService) {}

  @Post()
  create(@Body() createEstadoDto: CreateEstadoDto) {
    return this.estadosService.create(createEstadoDto);
  }

  @Get()
  findAll() {
    return this.estadosService.findAll();
  }

  @Get(':sigla')
  findOne(@Param('sigla') sigla: string) {
    return this.estadosService.findOne(sigla.toUpperCase());
  }

  @Patch(':sigla')
  update(@Param('sigla') sigla: string, @Body() updateEstadoDto: UpdateEstadoDto) {
    return this.estadosService.update(sigla.toUpperCase(), updateEstadoDto);
  }

  @Delete(':sigla')
  remove(@Param('sigla') sigla: string) {
    return this.estadosService.remove(sigla.toUpperCase());
  }
}